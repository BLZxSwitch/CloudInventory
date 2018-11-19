using Api.Components.Identities;
using Api.Components.InviteUser;
using Api.Components.SetPasswordEmail;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.Extensions.Localization;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading.Tasks;

namespace Api.UnitTests.Components.InviteUser
{
    [TestClass]
    public class InviteUserServiceUnitTest
    {
        private AutoMock _mock;
        private InviteUserService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<InviteUserService>();
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

            var localizedStringSubject = new LocalizedString("INVITE_USER_EMAIL_SUBJECT", "INVITE_USER_EMAIL_SUBJECT");
            var localizedStringBody = new LocalizedString("INVITE_USER_EMAIL_BODY", "INVITE_USER_EMAIL_BODY");

            _mock.Mock<IUserManager>()
                .Setup(x => x.GenerateInviteUserTokenAsync(user))
                .ReturnsAsync(token);

            _mock.Mock<IStringLocalizer<InviteUserService>>()
                .SetupGet(x => x["INVITE_USER_EMAIL_SUBJECT"])
                .Returns(localizedStringSubject);

            _mock.Mock<IStringLocalizer<InviteUserService>>()
                .SetupGet(x => x["INVITE_USER_EMAIL_BODY"])
                .Returns(localizedStringBody);

            await _service.SendPasswordResetTokenAsync(user);

            _mock.Mock<ISetPasswordEmailService>()
                .Verify(context => context.GenerateAndSendTokenAsync(user, token, "/auth/set-password", localizedStringSubject, localizedStringBody), Times.Once);
        }
    }
}
