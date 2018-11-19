using System;
using Api.Components.Otp;
using Api.Transports.AuthOtp;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Otp
{
    [TestClass]
    public class OtpResponseProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void ReturnsOptLinkResponse()
        {
            var otpToken = "otp token";
            var secretKey = "secret key";
            var optLink = "opt link";
            var userId = new Guid("{F9AF06A7-E9CB-437A-B6DB-165A322070F1}");
            var request = new OtpLinkRequest
            {
                IssuerName = "issuer name",
                UserEmail = "user name",
                UserId = userId
            };

            _mock.Mock<IOtpTokenProvider>()
                .Setup(instance => instance.Get(userId, secretKey))
                .Returns(otpToken);

            _mock.Mock<IOtpSecretKeyProvider>()
                .Setup(options => options.Get())
                .Returns(secretKey);

            _mock.Mock<IOtpLinkProvider>()
                .Setup(options => options.Get(request, secretKey))
                .Returns(optLink);

            var provider = _mock.Create<OtpResponseProvider>();
            var actual = provider.Get(request);

            var expected = new OtpGetLinkResponse
            {
                OtpLink = optLink,
                OtpToken = otpToken,
                SecretKey = secretKey
            };
            ContentAssert.AreEqual(expected, actual);
        }
    }
}
