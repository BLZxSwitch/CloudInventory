using Api.Common.Exceptions;
using Api.Components.Captcha;
using Api.Components.Identities;
using Api.Components.SignIn;
using Api.Components.UserStatusProvider;
using Api.Controllers;
using Api.Transports.Common;
using Api.Transports.ForgotPassword;
using Api.Transports.SignIn;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components;
using Api.Components.Jwt.JwtSecurityTokenValidator;
using Api.Components.Jwt.TokenValidationParametersProvider;
using Api.Components.Otp;
using Microsoft.IdentityModel.Tokens;
using UnitTests.Components.Asserts;
using UnitTests.Components.Helpers;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class AuthControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ReturnsSuccessResponse()
        {
            const string token = "token";
            const string email = "max@m.m";
            const string password = "Password";
            const bool rememberMe = true;
            const string validationToken = "validation token";
            var userId = new Guid("{155E521A-3D64-46C7-939E-8A3FC29DD201}");
            var roles = new List<string>
            {
                UserRoles.Employee.Name,
                UserRoles.CompanyAdministrator.Name,
            };

            var request = new SignInRequest
            {
                Email = email,
                Password = password,
                RememberMe = rememberMe,
                ValidationToken = validationToken
            };

            var securityUser = new SecurityUser
            {
                Id = userId,
                TwoFactorAuthenticationSecretKey = ""
            };

            var user = new User
            {
                Id = userId,
                Email = email,
                SecurityUser = securityUser
            };

            var userDTO = new UserDTO
            {
                Email = email,
                Roles = roles,
            };

            var signInResponse = new SignInResponse
            {
                Token = token,
                User = userDTO,
            };

            var expected = new OkObjectResult(signInResponse);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync(user);

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.CheckPasswordAsync(user, password))
                .ReturnsAsync(true);

            _mock.Mock<ISignInResponseProvider>()
                .Setup(provider => provider.Get(user, rememberMe))
                .Returns(signInResponse);

            _mock.Mock<IUserActiveStatusProvider>()
                .Setup(provider => provider.IsActiveAsync(It.IsAny<Guid>()))
                .ReturnsAsync(true);

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            var controller = _mock.Create<AuthController>();
            var actual = await controller.SignIn(request);
            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void ReturnsFailResponseWhenValidationTokenIsNotValid()
        {
            const string email = "max@m.m";
            const string validationToken = "validation token";
            var request = new SignInRequest
            {
                Email = email,
                ValidationToken = validationToken
            };

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(false);

            var controller = _mock.Create<AuthController>();
            var expected = new BadRequestException("CAPTCHA_TOKEN_IS_INVALID");
            ExceptionAssert.ThrowsAsync(expected, () => controller.SignIn(request));
        }

        [TestMethod]
        public void ReturnsFailResponseWhenOtpCodeIsNotValid()
        {
            const int code = 12345;
            const string email = "max@m.m";
            const string password = "Password";
            const string validationToken = "validation token";
            var userId = new Guid("{DD71D20B-339D-4BA6-ACB5-842E42B3A673}");

            var request = new SignInRequest
            {
                Email = email,
                Password = password,
                ValidationToken = validationToken,
            };

            var securityUser = new SecurityUser
            {
                Id = userId,
                TwoFactorAuthenticationSecretKey = "SomeKey"
            };

            var user = new User
            {
                Id = userId,
                SecurityUser = securityUser
            };

            var token = "token";

            var expected = new ContentResult
            {
                StatusCode = 449,
                Content = token
            };

            _mock.Mock<IUserActiveStatusProvider>()
                .Setup(provider => provider.IsActiveAsync(userId))
                .ReturnsAsync(true);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync(user);

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.CheckPasswordAsync(user, password))
                .ReturnsAsync(true);

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            _mock.Mock<IOtpSignInValidationService>()
                .Setup(provider => provider.Validate(userId, code))
                .ReturnsAsync(false);

            _mock.Mock<IOtpAuthTokenProvider>()
                .Setup(provider => provider.Get(user.Id))
                .Returns(token);

            var controller = _mock.Create<AuthController>();
            var actual = controller.SignIn(request);

            ContentAssert.IsEqual(actual.Result, expected);
        }

        [TestMethod]
        public void ReturnsFailResponseWhenEmailDoesNotFound()
        {
            const string email = "max@m.m";
            const string validationToken = "validation token";
            var request = new SignInRequest
            {
                Email = email,
                ValidationToken = validationToken
            };

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync((User)null);

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            var controller = _mock.Create<AuthController>();
            var expected = new BadRequestException("LOGIN_FAILED");
            ExceptionAssert.ThrowsAsync(expected, () => controller.SignIn(request));
        }

        [TestMethod]
        public void ReturnsFailResponseWhenPasswordDoesNotMatch()
        {
            const string email = "max@m.m";
            const string password = "Password";
            const string validationToken = "validation token";
            var request = new SignInRequest
            {
                Email = email,
                Password = password,
                ValidationToken = validationToken
            };

            var user = new User();

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync(user);

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.CheckPasswordAsync(user, password))
                .ReturnsAsync(false);

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            var controller = _mock.Create<AuthController>();

            var expected = new BadRequestException("LOGIN_FAILED");
            ExceptionAssert.ThrowsAsync(expected, () => controller.SignIn(request));
        }

        [TestMethod]
        public void ReturnsFailResponseWhenUserIsDeactivated()
        {
            const string email = "max@m.m";
            const string password = "Password";
            const string validationToken = "validation token";
            var userId = new Guid("{DD71D20B-339D-4BA6-ACB5-842E42B3A673}");

            var request = new SignInRequest
            {
                Email = email,
                Password = password,
                ValidationToken = validationToken
            };

            var user = new User
            {
                Id = userId
            };

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync(user);

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.CheckPasswordAsync(user, password))
                .ReturnsAsync(true);

            _mock.Mock<IUserActiveStatusProvider>()
                .Setup(provider => provider.IsActiveAsync(userId))
                .ReturnsAsync(false);

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            var controller = _mock.Create<AuthController>();

            var expected = new BadRequestException("USER_INACTIVE");
            ExceptionAssert.ThrowsAsync(expected, () => controller.SignIn(request));
        }

        [TestMethod]
        public async Task ForgotPasswordShouldReturnOkResultWhenAllIsCorrect()
        {
            const string email = "max@m.m";
            const string validationToken = "validation token";

            var request = new ForgotPasswordRequest
            {
                Email = email,
                ValidationToken = validationToken
            };

            var user = new User();
            var response = SendGridHelper.GetEmptyResponse(System.Net.HttpStatusCode.Accepted);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync(user);

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            var controller = _mock.Create<AuthController>();
            var actual = await controller.ForgotPassword(request);

            var expected = new OkResult();
            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ForgotPasswordShouldReturnBadRequestWhenUserIsNotFound()
        {
            const string email = "max@m.m";
            const string validationToken = "validation token";

            var request = new ForgotPasswordRequest
            {
                Email = email,
                ValidationToken = validationToken
            };

            var response = SendGridHelper.GetEmptyResponse(System.Net.HttpStatusCode.Accepted);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync(null as User);

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            var controller = _mock.Create<AuthController>();
            var actual = await controller.ForgotPassword(request);
            var expected = new BadRequestObjectResult("USER_NOT_FOUND");

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ResetPasswordShouldReturnOkResultWhenAllIsCorrect()
        {
            const string code = "token";
            const string password = "Password";
            const string token = "token";
            const string email = "max@m.m";
            Guid userId = Guid.NewGuid();
            var roles = new List<string>
            {
                UserRoles.Employee.Name,
                UserRoles.CompanyAdministrator.Name,
            };

            var request = new ResetPasswordRequest
            {
                Code = code,
                Password = password,
                UserId = userId
            };

            var user = new User()
            {
                Id = userId,
                Email = email,
            };

            var userDTO = new UserDTO
            {
                Email = email,
                Roles = roles,
            };

            var response = SendGridHelper.GetEmptyResponse(System.Net.HttpStatusCode.Accepted);

            var expected = new SignInResponse
            {
                Token = token,
                User = new UserDTO
                {
                    Email = email,
                    Roles = roles,
                }
            };

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByIdAsync(userId))
                .ReturnsAsync(user);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.ResetPasswordAsync(user, code, password))
                .ReturnsAsync(IdentityResult.Success);

            _mock.Mock<ISignInResponseProvider>()
                .Setup(provider => provider.Get(user, false))
                .Returns(expected);

            var controller = _mock.Create<AuthController>();
            var actual = await controller.ResetPassword(request);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void ResetPasswordShouldReturnBadRequestWhenUserIsNotFound()
        {
            const string code = "token";
            const string password = "Password";
            Guid userId = Guid.NewGuid();

            var request = new ResetPasswordRequest
            {
                Code = code,
                Password = password,
                UserId = userId
            };

            var response = SendGridHelper.GetEmptyResponse(System.Net.HttpStatusCode.Accepted);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByIdAsync(userId))
                .ReturnsAsync(null as User);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.ResetPasswordAsync(null, code, password))
                .ReturnsAsync(IdentityResult.Failed());

            var controller = _mock.Create<AuthController>();

            var expected = new BadRequestException("USER_NOT_FOUND");

            ExceptionAssert.ThrowsAsync(expected, () => controller.ResetPassword(request));
        }

        [TestMethod]
        public void ResetPasswordShouldReturnBadRequestWhenGenerateAndSendIsFailed()
        {
            const string code = "token";
            const string password = "Password";
            Guid userId = Guid.NewGuid();

            var request = new ResetPasswordRequest
            {
                Code = code,
                Password = password,
                UserId = userId
            };

            var user = new User();
            var response = SendGridHelper.GetEmptyResponse(System.Net.HttpStatusCode.BadRequest);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByIdAsync(userId))
                .ReturnsAsync(user);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.ResetPasswordAsync(user, code, password))
                .ReturnsAsync(IdentityResult.Failed());

            var controller = _mock.Create<AuthController>();

            var expected = new BadRequestException("TOKEN_IS_INVALID");

            ExceptionAssert.ThrowsAsync(expected, () => controller.ResetPassword(request));
        }

        [TestMethod]
        public void OtpSignInSouldShouldReturnBadRequestWhenValidationTokenIsNotValid()
        {
            const string token = "token";
            const string validationToken = "validation token";
            const int code = 123;
            var request = new OtpSignInRequest
            {
                Code = code,
                ValidationToken = validationToken,
                Token = token
            };

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(false);

            var controller = _mock.Create<AuthController>();
            var expected = new BadRequestException("CAPTCHA_TOKEN_IS_INVALID");
            ExceptionAssert.ThrowsAsync(expected, () => controller.OtpSignIn(request));
        }

        //[TestMethod]
        //public void OtpSignInSouldShouldReturnBadRequestWhenOtpAuthTokenClaimNameIsWrong()
        //{
        //    const string token = "token";
        //    const string validationToken = "validation token";
        //    const int code = 123;
        //    var request = new OtpSignInRequest
        //    {
        //        Code = code,
        //        ValidationToken = validationToken,
        //        Token = token
        //    };

        //    var parameters = new TokenValidationParameters
        //    {
        //        ValidateIssuer = true,
        //        ValidateAudience = true,
        //        ValidateLifetime = true,
        //        ValidateIssuerSigningKey = true,

        //    };

        //    var claim = new Claim(ProjectClaims.OtpAuthTokenClaimName, "false");

        //    var claimsIdentity = new ClaimsIdentity(new Claim[] { claim }, "");

        //    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

        //    _mock.Mock<ITokenValidationParametersProvider>()
        //        .Setup(provider => provider.GetParameters())
        //        .Returns(parameters);

        //    _mock.Mock<IJwtSecurityTokenValidator>()
        //        .Setup(provider => provider.Validate(token, parameters))
        //        .Returns(claimsPrincipal);

        //    _mock.Mock<ICaptchaValidationService>()
        //        .Setup(provider => provider.IsValidAsync(validationToken))
        //        .ReturnsAsync(true);

        //    var controller = _mock.Create<AuthController>();
        //    var expected = new BadRequestException("INVALID_OTP_TOKEN");
        //    ExceptionAssert.ThrowsAsync(expected, () => controller.OtpSignIn(request));
        //}

        [TestMethod]
        public void OtpSignInSouldShouldReturnBadRequestWhenOtpCodeIsWrong()
        {
            const string token = "token";
            const string validationToken = "validation token";
            const int code = 123;
            var userId = new Guid("5582f0f2-e904-4240-86cf-e0f865783aa5");

            var user = new User()
            {
                Id = userId
            };

            var request = new OtpSignInRequest
            {
                Code = code,
                ValidationToken = validationToken,
                Token = token
            };

            var parameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

            };

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            _mock.Mock<ITokenValidationParametersProvider>()
                .Setup(provider => provider.GetParameters())
                .Returns(parameters);

            _mock.Mock<IUserIdFromOtpTokenProvider>()
                .Setup(provider => provider.Get(token))
                .Returns(userId);

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.FindByIdAsync(userId))
                .ReturnsAsync(user);

            _mock.Mock<IOtpSignInValidationService>()
                .Setup(provider => provider.Validate(user.Id, code))
                .ReturnsAsync(false);

            var controller = _mock.Create<AuthController>();
            var expected = new BadRequestException("INVALID_OTP_CODE");
            ExceptionAssert.ThrowsAsync(expected, () => controller.OtpSignIn(request));
        }

        [TestMethod]
        public void OtpSignInSouldShouldReturnOkResultWhenAllIsCorrect()
        {
            const string token = "token";
            const string validationToken = "validation token";
            const int code = 123;
            var userId = new Guid("5582f0f2-e904-4240-86cf-e0f865783aa5");

            var user = new User()
            {
                Id = userId
            };

            var request = new OtpSignInRequest
            {
                Code = code,
                ValidationToken = validationToken,
                Token = token
            };

            var parameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

            };


            var expected = new SignInResponse();

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);

            _mock.Mock<ITokenValidationParametersProvider>()
                .Setup(provider => provider.GetParameters())
                .Returns(parameters);

            _mock.Mock<IUserIdFromOtpTokenProvider>()
                .Setup(provider => provider.Get(token))
                .Returns(userId);

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.FindByIdAsync(userId))
                .ReturnsAsync(user);

            _mock.Mock<IOtpSignInValidationService>()
                .Setup(provider => provider.Validate(user.Id, code))
                .ReturnsAsync(true);

            _mock.Mock<ISignInResponseProvider> ()
                .Setup(provider => provider.Get(user, false))
                .Returns(expected);

            var controller = _mock.Create<AuthController>();
            var actual = controller.OtpSignIn(request);
            
            ContentAssert.AreEqual(actual.Result, expected);
        }
    }
}