using Api.Components.Factories;
using Api.Components.Jwt.TokenClaimsPrincipalFactory;
using Api.Components.Jwt.UserIdClaimValueProvider;
using Api.Components.Otp;
using Api.Transports.AuthOtp;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SecurityDriven.Inferno.Extensions;
using System;
using System.Security.Claims;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Otp
{
    [TestClass]
    public class OtpActivationRequestParamProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsActivationRequestParams()
        {
            var otp = "123456";
            var password = "password";
            var secretKey = "secret key123456";
            var otpToken = "otp token";
            var userId = new Guid("{289D2B80-8FFA-43FC-996A-871CC5145308}");

            var credentials = new OtpActivationRequest
            {
                Otp = otp,
                Password = password,
                OtpToken = otpToken
            };

            var claimsPrincipal = new Mock<ClaimsPrincipal>().Object;

            _mock.Mock<ITokenClaimsPrincipalFactory>()
                .Setup(instance => instance.Create(otpToken))
                .Returns(claimsPrincipal);

            _mock.Mock<IUserIdClaimValueProvider>()
                .Setup(instance => instance.GetValue())
                .Returns(userId);
            _mock.Mock<IOtpSecretKeyClaimValueProvider>()
                .Setup(instance => instance.GetValue())
                .Returns(secretKey);

            _mock.Mock<IFactory<ClaimsPrincipal, IUserIdClaimValueProvider>>()
                .Setup(factory => factory.Create(claimsPrincipal))
                .Returns(_mock.Mock<IUserIdClaimValueProvider>().Object);

            _mock.Mock<IFactory<ClaimsPrincipal, IOtpSecretKeyClaimValueProvider>>()
                .Setup(factory => factory.Create(claimsPrincipal))
                .Returns(_mock.Mock<IOtpSecretKeyClaimValueProvider>().Object);

            var provider = _mock.Create<OtpActivationRequestParamProvider>();
            var actual = provider.Get(credentials);

            var secretKeyData = secretKey.FromBase32(config: Base32Config.Rfc);
            var expected = new OtpActivationRequestParams
            {
                Otp = otp,
                Password = password,
                SecretKey = secretKeyData,
                UserId = userId
            };
            
            ContentAssert.AreEqual(expected, actual);
        }
    }
}