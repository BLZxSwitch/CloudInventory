using Api.Components.Identities;
using Api.Components.ResetPassword;
using Api.Components.SetPasswordEmail;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.Extensions.Localization;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading.Tasks;

namespace Api.UnitTests.Components.ResetPassword
{
    [TestClass]
    public class ResetPasswordServiceUnitTest
    {
        private AutoMock _mock;
        private ResetPasswordService _resetPasswordService;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _resetPasswordService = _mock.Create<ResetPasswordService>();
        }

        [TestMethod]
        public async Task ShouldGenerateAndSendPasswordResetToken()
        {
            var user = new User()
            {
                Id = Guid.NewGuid(),
                Email = "some@email.com"
            };
            var token = "token";

            var localizedStringSubject = new LocalizedString("RESET_PASSWORD_EMAIL_SUBJECT", "RESET_PASSWORD_EMAIL_SUBJECT");
            var localizedStringBody = new LocalizedString("RESET_PASSWORD_EMAIL_BODY", "RESET_PASSWORD_EMAIL_BODY");

            _mock.Mock<IUserManager>()
                .Setup(x => x.GeneratePasswordResetTokenAsync(user))
                .ReturnsAsync(token);

            _mock.Mock<IStringLocalizer<ResetPasswordService>>()
                .SetupGet(x => x["RESET_PASSWORD_EMAIL_SUBJECT"])
                .Returns(localizedStringSubject);

            _mock.Mock<IStringLocalizer<ResetPasswordService>>()
                .SetupGet(x => x["RESET_PASSWORD_EMAIL_BODY"])
                .Returns(localizedStringBody);

            await _resetPasswordService.SendPasswordResetTokenAsync(user);

            _mock.Mock<ISetPasswordEmailService>()
                .Verify(context => context.GenerateAndSendTokenAsync(user, token, "/auth/reset", localizedStringSubject, localizedStringBody), Times.Once);
        }
    }
}
