using Api.Components.CurrentUserProvider;
using Api.Components.Identities;
using Api.Components.Otp;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.UnitTests.Components.Otp
{
    [TestClass]
    public class OtpActivationRequestValidationServiceUnitTests
    {
        private readonly User _user = new User
        {
            Id = new Guid("{01AB230A-940C-4816-B91A-6C49110A6666}")
        };
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            var claimsPrincipal = _mock.Mock<ClaimsPrincipal>().Object;
            var httpContext = _mock.Mock<HttpContext>().Object;

            _mock.Mock<HttpContext>()
                .SetupGet(context => context.User)
                .Returns(claimsPrincipal);

            _mock.Mock<IHttpContextAccessor>()
                .SetupGet(accessor => accessor.HttpContext)
                .Returns(httpContext);

            _mock.Mock<ICurrentUserProvider>()
                .Setup(instance => instance.GetUserAsync(claimsPrincipal))
                .ReturnsAsync(_user);
        }

        [TestMethod]
        public async Task ReturnsValidWhenRequestIsValid()
        {
            var secretKey = new byte[]{ 1 };
            var code = 123456;
            var activationRequest = new OtpActivationRequestParams
            {
                Otp = code.ToString(),
                SecretKey = secretKey,
                Password = "password",
                UserId = _user.Id
            };

            _mock.Mock<IOtpCodeValidationService>()
                .Setup(instance => instance.Validate(secretKey, code))
                .Returns(true);
            _mock.Mock<IUserManager>()
                .Setup(instance => instance.CheckPasswordAsync(_user, activationRequest.Password))
                .ReturnsAsync(true);

            var service = _mock.Create<OtpActivationRequestValidationService>();
            var actual = await service.ValidateAsync(activationRequest);

            Assert.AreEqual("VALID", actual);
        }

        [TestMethod]
        public async Task ReturnsInvalidRequestWhenOtpCodeIsNotANumber()
        {
            var activationRequest = new OtpActivationRequestParams
            {
                Otp = "test",
            };

            var service = _mock.Create<OtpActivationRequestValidationService>();
            var actual = await service.ValidateAsync(activationRequest);

            Assert.AreEqual("OTP_INVALID_REQUEST", actual);
        }


        [TestMethod]
        public async Task ReturnsInvalidOtpCodeWhenCodeIsNotValid()
        {
            var secretKey = new byte[] { 1 };
            var code = 123456;
            var activationRequest = new OtpActivationRequestParams
            {
                Otp = code.ToString(),
                SecretKey = secretKey,
            };

            _mock.Mock<IOtpCodeValidationService>()
                .Setup(instance => instance.Validate(secretKey, code))
                .Returns(false);

            var service = _mock.Create<OtpActivationRequestValidationService>();
            var actual = await service.ValidateAsync(activationRequest);

            Assert.AreEqual("INVALID_OTP_CODE", actual);
        }

        [TestMethod]
        public async Task ReturnsInvalidRequestWhenUserIdIsNotMatch()
        {
            var secretKey = new byte[] { 1 };
            var code = 123456;
            var activationRequest = new OtpActivationRequestParams
            {
                Otp = code.ToString(),
                SecretKey = secretKey,
                Password = "password",
                UserId = new Guid("{5ABF33C4-ED8E-405C-AE6A-D06AD6D2AFFC}")
            };

            _mock.Mock<IOtpCodeValidationService>()
                .Setup(instance => instance.Validate(secretKey, code))
                .Returns(true);
            _mock.Mock<IUserManager>()
                .Setup(instance => instance.CheckPasswordAsync(_user, activationRequest.Password))
                .ReturnsAsync(true);

            var service = _mock.Create<OtpActivationRequestValidationService>();
            var actual = await service.ValidateAsync(activationRequest);

            Assert.AreEqual("OTP_INVALID_REQUEST", actual);
        }

        [TestMethod]
        public async Task ReturnsInvalidPasswordWhenPasswordIsNotMatch()
        {
            var secretKey = new byte[] { 1 };
            var code = 123456;
            var activationRequest = new OtpActivationRequestParams
            {
                Otp = code.ToString(),
                SecretKey = secretKey,
                Password = "password",
                UserId = _user.Id
            };

            _mock.Mock<IOtpCodeValidationService>()
                .Setup(instance => instance.Validate(secretKey, code))
                .Returns(true);
            _mock.Mock<IUserManager>()
                .Setup(instance => instance.CheckPasswordAsync(_user, activationRequest.Password))
                .ReturnsAsync(false);

            var service = _mock.Create<OtpActivationRequestValidationService>();
            var actual = await service.ValidateAsync(activationRequest);

            Assert.AreEqual("INVALID_PASSWORD", actual);
        }
    }
}
