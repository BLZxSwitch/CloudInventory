using System;
using Api.Common.Exceptions;
using Api.Transports.SignIn;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Security.Claims;
using Api.Components;
using Api.Components.Jwt.JwtSecurityTokenValidator;
using Api.Components.Jwt.TokenValidationParametersProvider;
using Api.Components.Otp;
using Microsoft.IdentityModel.Tokens;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.Otp
{
    [TestClass]
    public class UserIdFromOtpTokenProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ShouldReturnBadRequestWhenOtpAuthTokenClaimNameIsWrong()
        {
            const string token = "token";

            var parameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

            };

            var claim = new Claim(ProjectClaims.JwtTokenHasLongTimeToLiveClaimName, "");

            var claimsIdentity = new ClaimsIdentity(new Claim[] { claim }, "");

            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            _mock.Mock<ITokenValidationParametersProvider>()
                .Setup(provider => provider.GetParameters())
                .Returns(parameters);

            _mock.Mock<IJwtSecurityTokenValidator>()
                .Setup(provider => provider.Validate(token, parameters))
                .Returns(claimsPrincipal);

            _mock.Mock<ClaimsPrincipal>()
                .Setup(identity => identity.Claims)
                .Returns(claim.ToEnumerable());

            var controller = _mock.Create<UserIdFromOtpTokenProvider>();
            
            ExceptionAssert.Throws<BadRequestException>(() => controller.Get(token));
        }

        [TestMethod]
        public void ShouldReturnUserId()
        {
            const string token = "token";

            var parameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

            };

            var claim = new Claim(ProjectClaims.OtpAuthTokenClaimName, "");
            var claim2 = new Claim(ClaimTypes.NameIdentifier, "5582f0f2-e904-4240-86cf-e0f865783aa5");

            var claimsIdentity = new ClaimsIdentity(new Claim[] { claim, claim2 }, "");

            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            _mock.Mock<ITokenValidationParametersProvider>()
                .Setup(provider => provider.GetParameters())
                .Returns(parameters);

            _mock.Mock<IJwtSecurityTokenValidator>()
                .Setup(provider => provider.Validate(token, parameters))
                .Returns(claimsPrincipal);

            var expected = new Guid("5582f0f2-e904-4240-86cf-e0f865783aa5");

            var controller = _mock.Create<UserIdFromOtpTokenProvider>();

            var actual = controller.Get(token);

            ContentAssert.AreEqual(actual, expected);
        }
    }
}