using Api.Components.Otp;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading.Tasks;

namespace Api.UnitTests.Components.Otp
{
    [TestClass]
    public class OtpSignInValidationServiceUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ReturnsActivationRequestParams()
        {
            var userId = new Guid("{FF9C001A-075B-4ACB-B31F-07E818A56A99}");
            var credentialsCode = 123456;

            var secretKeyData = new byte[] { 1 };

            _mock.Mock<IOtpSecretKeyProvider>()
                .Setup(provider => provider.ReadAsync(userId))
                .ReturnsAsync(secretKeyData);

            var service = _mock.Create<OtpSignInValidationService>();
            await service.Validate(userId, credentialsCode);


            _mock.Mock<IOtpSecretKeyProvider>()
                .Verify(context => context.ReadAsync(userId), Times.Once);

            _mock.Mock<IOtpCodeValidationService>()
                .Verify(context => context.Validate(secretKeyData, credentialsCode), Times.Once);
        }
    }
}
