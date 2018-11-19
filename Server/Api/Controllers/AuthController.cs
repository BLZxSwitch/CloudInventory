using System;
using System.Security.Claims;
using Api.Common.Exceptions;
using Api.Components.Captcha;
using Api.Components.Identities;
using Api.Components.InviteUser;
using Api.Components.ResetPassword;
using Api.Components.SignIn;
using Api.Components.TermsOfService;
using Api.Components.UserStatusProvider;
using Api.Transports.ForgotPassword;
using Api.Transports.SignIn;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Api.Components.Jwt.JwtSecurityTokenValidator;
using Api.Components.Jwt.TokenValidationParametersProvider;
using Api.Components.Otp;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly IResetPasswordService _resetPasswordService;
        private readonly ISignInResponseProvider _signInResponseProvider;
        private readonly IUserActiveStatusProvider _userActiveStatusProvider;
        private readonly ISetInvitationAcceptedService _setInvitationAcceptedService;
        private readonly IOtpSignInValidationService _otpSignInValidationService;
        private readonly IOtpAuthTokenProvider _otpAuthTokenProvider;
        private readonly IJwtSecurityTokenValidator _jwtSecurityTokenValidator;
        private readonly ITokenValidationParametersProvider _tokenValidationParametersProvider;
        private readonly IUserIdFromOtpTokenProvider _userIdFromOtpTokenProvider;
        private readonly IUserManager _userManager;
        private readonly ICaptchaValidationService _captchaValidationService;
        private readonly IUserToSService _userToSService;

        public AuthController(
            IUserManager userManager,
            ICaptchaValidationService captchaValidationService,
            IUserToSService userToSService,
            IResetPasswordService resetPasswordService,
            ISignInResponseProvider signInResponseProvider,
            IUserActiveStatusProvider userActiveStatusProvider,
            ISetInvitationAcceptedService setInvitationAcceptedService,
            IOtpSignInValidationService otpSignInValidationService,
            IOtpAuthTokenProvider otpAuthTokenProvider,
            IJwtSecurityTokenValidator jwtSecurityTokenValidator,
            ITokenValidationParametersProvider tokenValidationParametersProvider,
            IUserIdFromOtpTokenProvider userIdFromOtpTokenProvider)
        {
            _userManager = userManager;
            _userToSService = userToSService;
            _captchaValidationService = captchaValidationService;
            _resetPasswordService = resetPasswordService;
            _signInResponseProvider = signInResponseProvider;
            _userActiveStatusProvider = userActiveStatusProvider;
            _setInvitationAcceptedService = setInvitationAcceptedService;
            _otpSignInValidationService = otpSignInValidationService;
            _otpAuthTokenProvider = otpAuthTokenProvider;
            _jwtSecurityTokenValidator = jwtSecurityTokenValidator;
            _tokenValidationParametersProvider = tokenValidationParametersProvider;
            _userIdFromOtpTokenProvider = userIdFromOtpTokenProvider;
        }

        [HttpPost]
        public async Task<SignInResponse> OtpSignIn([FromBody] OtpSignInRequest credentials)
        {
            var isTokenValid = await _captchaValidationService.IsValidAsync(credentials.ValidationToken);
            if (!isTokenValid)
                throw new BadRequestException("CAPTCHA_TOKEN_IS_INVALID");

            var user = await _userManager.FindByIdAsync(_userIdFromOtpTokenProvider.Get(credentials.Token));

            if (!await _otpSignInValidationService.Validate(user.Id, credentials.Code))
            {
                throw new BadRequestException("INVALID_OTP_CODE");
            }

            return _signInResponseProvider.Get(user, false);
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(449)]
        public async Task<IActionResult> SignIn([FromBody] SignInRequest credentials)
        {
            var isTokenValid = await _captchaValidationService.IsValidAsync(credentials.ValidationToken);
            if (!isTokenValid)
                throw new BadRequestException("CAPTCHA_TOKEN_IS_INVALID");

            var user = await _userManager.FindByEmailAsync(credentials.Email);
            if (user == null)
                throw new BadRequestException("LOGIN_FAILED");

            var isValid = await _userManager.CheckPasswordAsync(user, credentials.Password);
            if (isValid == false)
                throw new BadRequestException("LOGIN_FAILED");

            var isActive = await _userActiveStatusProvider.IsActiveAsync(user.Id);
            if (isActive == false)
                throw new BadRequestException("USER_INACTIVE");

            if (user.SecurityUser.IsTwoFactorAuthenticationEnabled)
            {
                var token = _otpAuthTokenProvider.Get(user.Id);

                return new ContentResult
                {
                    StatusCode = 449,
                    Content = token
                };
            }

            return Ok(_signInResponseProvider.Get(user, credentials.RememberMe));
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
        {
            var isTokenValid = await _captchaValidationService.IsValidAsync(model.ValidationToken);
            if (!isTokenValid)
                throw new BadRequestException("CAPTCHA_TOKEN_IS_INVALID");

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("USER_NOT_FOUND");

            await _resetPasswordService.SendPasswordResetTokenAsync(user);
            return Ok();
        }

        [HttpPost]
        public async Task<SignInResponse> SetPassword([FromBody] SetPasswordRequest model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
                throw new BadRequestException("USER_NOT_FOUND");

            if (user.SecurityUser.IsInvitationAccepted)
            {
                throw new BadRequestException("ALREADY_ACCEPTED");
            }

            var resetPasswordResult = await _userManager.SetPassworForInvitationdAsync(user, model.Code, model.Password);

            if (!resetPasswordResult.Succeeded)
                throw new BadRequestException("TOKEN_IS_INVALID");

            var result = _signInResponseProvider.Get(user, false);

            await _userToSService.AcceptAsync(user.SecurityUser.Id);

            await _setInvitationAcceptedService.SetInvitationAccepted(user.SecurityUser.Id);

            return result;
        }

        [HttpPost]
        public async Task<SignInResponse> ResetPassword([FromBody] ResetPasswordRequest model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
                throw new BadRequestException("USER_NOT_FOUND");

            var resetPasswordResult = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);

            if (!resetPasswordResult.Succeeded)
                throw new BadRequestException("TOKEN_IS_INVALID");

            var result = _signInResponseProvider.Get(user, false);

            return result;
        }
    }
}