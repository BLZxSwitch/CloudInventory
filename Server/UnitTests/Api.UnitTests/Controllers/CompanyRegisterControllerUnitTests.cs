using Api.Common.Exceptions;
using Api.Components.Captcha;
using Api.Components.CompanyRegister;
using Api.Components.SignIn;
using Api.Controllers;
using Api.Transports.Common;
using Api.Transports.CompanyRegister;
using Api.Transports.SignIn;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class CompanyRegisterControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _mock.Create<CompanyRegisterController>();
        }

        [TestMethod]
        public async Task ReturnsSuccessResponse()
        {
            var userId = Guid.NewGuid();
            const string token = "token";
            const string email = "max@m.m";
            var validationToken = "validation token";
            var request = new CompanyRegisterRequest
            {
                Email = email,
                ValidationToken = validationToken
            };

            var expected = new SignInResponse
            {
                Token = token,
                User = new UserDTO {Email = email}
            };

            _mock.Mock<ICompanyRegisterService>()
                .Setup(provider => provider.Register(request))
                .ReturnsAsync(userId);

            _mock.Mock<ISignInResponseProvider>()
                .Setup(provider => provider.GetAsync(userId, false))
                .ReturnsAsync(expected);

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(true);
            
            var controller = _mock.Create<CompanyRegisterController>();
            var actual = await controller.Register(request);
            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void ReturnsFailResponseWhenValidationTokenIsNotValid()
        {
            const string email = "max@m.m";
            const string validationToken = "validation token";
            var request = new CompanyRegisterRequest
            {
                Email = email,
                ValidationToken = validationToken
            };

            _mock.Mock<ICaptchaValidationService>()
                .Setup(provider => provider.IsValidAsync(validationToken))
                .ReturnsAsync(false);

            var controller = _mock.Create<CompanyRegisterController>();
            var expected = new BadRequestException("CAPTCHA_TOKEN_IS_INVALID");
            ExceptionAssert.ThrowsAsync(expected, () => controller.Register(request));
        }
    }
}