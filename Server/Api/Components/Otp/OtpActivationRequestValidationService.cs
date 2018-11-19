using Api.Components.CurrentUserProvider;
using Api.Components.Identities;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    [As(typeof(IOtpActivationRequestValidationService))]
    class OtpActivationRequestValidationService : IOtpActivationRequestValidationService
    {
        private readonly IUserManager _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICurrentUserProvider _currentUserProvider;
        private readonly IOtpCodeValidationService _otpCodeValidationService;

        public OtpActivationRequestValidationService(
            IUserManager userManager,
            IHttpContextAccessor httpContextAccessor,
            ICurrentUserProvider currentUserProvider,
            IOtpCodeValidationService otpCodeValidationService)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            _currentUserProvider = currentUserProvider;
            _otpCodeValidationService = otpCodeValidationService;
        }

        public async Task<string> ValidateAsync(OtpActivationRequestParams activationRequest)
        {
            int code;
            if (int.TryParse(activationRequest.Otp, out code) == false)
            {
                return "OTP_INVALID_REQUEST";
            }

            if (_otpCodeValidationService.Validate(activationRequest.SecretKey, code) == false)
            {
                return "INVALID_OTP_CODE";
            }

            var principal = _httpContextAccessor.HttpContext.User;
            var user = await _currentUserProvider.GetUserAsync(principal);

            if (user.Id != activationRequest.UserId)
            {
                return "OTP_INVALID_REQUEST";
            }

            var isValid = await _userManager.CheckPasswordAsync(user, activationRequest.Password);
            if (isValid == false)
            {
                return "INVALID_PASSWORD";
            }
            return "VALID";
        }
    }
}