using Api.Common.Exceptions;
using Api.Components.Otp;
using Api.Controllers;
using Api.Transports.AuthOtp;
using Api.Transports.Common;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class AuthOtpControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task GetReturnsSuccessResponse()
        {
            var expected = new OtpGetLinkResponse();
            var request = new OtpLinkRequest();

            _mock.Mock<IOtpLinkRequestProvider>()
                .Setup(instance => instance.GetAsync())
                .ReturnsAsync(request);
            _mock.Mock<IOtpResponseProvider>()
                .Setup(instance => instance.Get(request))
                .Returns(expected);

            var controller = _mock.Create<AuthOtpController>();
            var actual = await controller.Get();

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ActivateReturnsSuccessResponse()
        {
            var credentials = new OtpActivationRequest();
            var activationParams = new OtpActivationRequestParams();
            var userSettings = new UserSettingsDTO();

            _mock.Mock<IOtpActivationRequestParamProvider>()
                .Setup(instance => instance.Get(credentials))
                .Returns(activationParams);

            _mock.Mock<IOtpActivationRequestValidationService>()
                .Setup(instance => instance.ValidateAsync(activationParams))
                .ReturnsAsync("VALID");
            
            _mock.Mock<IOtpActivationService>()
                .Setup(instance => instance.ActivateAsync(activationParams))
                .ReturnsAsync(userSettings);

            var controller = _mock.Create<AuthOtpController>();
            var actual = await controller.Activate(credentials);

            ContentAssert.AreEqual(userSettings, actual);
        }

        [TestMethod]
        public void ActivateReturnsBadResponseWhenRequestIsNotValid()
        {
            var credentials = new OtpActivationRequest();
            var activationParams = new OtpActivationRequestParams();

            _mock.Mock<IOtpActivationRequestParamProvider>()
                .Setup(instance => instance.Get(credentials))
                .Returns(activationParams);

            _mock.Mock<IOtpActivationRequestValidationService>()
                .Setup(instance => instance.ValidateAsync(activationParams))
                .ReturnsAsync("NOT_VALID");

            var controller = _mock.Create<AuthOtpController>();

            var expected = new BadRequestException("NOT_VALID");
            ExceptionAssert.ThrowsAsync(expected, () => controller.Activate(credentials));

            _mock.Mock<IOtpActivationService>()
                .Verify(instance => instance.ActivateAsync(activationParams), Times.Never);
        }

        [TestMethod]
        public void ActivateReturnsBadResponseWhenRequestParamsNotValid()
        {
            var credentials = new OtpActivationRequest();
            OtpActivationRequestParams activationParams = null;

            _mock.Mock<IOtpActivationRequestParamProvider>()
                .Setup(instance => instance.Get(credentials))
                .Returns(activationParams);

            _mock.Mock<IOtpActivationRequestValidationService>()
                .Setup(instance => instance.ValidateAsync(activationParams))
                .ReturnsAsync("VALID");

            var controller = _mock.Create<AuthOtpController>();

            var expected = new BadRequestException("OTP_INVALID_REQUEST");
            ExceptionAssert.ThrowsAsync(expected, () => controller.Activate(credentials));

            _mock.Mock<IOtpActivationService>()
                .Verify(instance => instance.ActivateAsync(activationParams), Times.Never);
        }


        [TestMethod]
        public async Task DeactivateReturnsSuccessResponse()
        {
            var credentials = new OtpDeactivationRequest();
            var activationParams = new OtpActivationRequestParams();
            var userSettings = new UserSettingsDTO();

            _mock.Mock<IOtpDeactivationRequestParamProvider>()
                .Setup(instance => instance.GetAsync(credentials))
                .ReturnsAsync(activationParams);

            _mock.Mock<IOtpActivationRequestValidationService>()
                .Setup(instance => instance.ValidateAsync(activationParams))
                .ReturnsAsync("VALID");

            _mock.Mock<IOtpDeactivationService>()
                .Setup(instance => instance.DeactivateAsync(activationParams))
                .ReturnsAsync(userSettings);

            var controller = _mock.Create<AuthOtpController>();
            var actual = await controller.Deactivate(credentials);

            ContentAssert.AreEqual(userSettings, actual);
        }
    }
}
