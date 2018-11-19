using Api.Common;
using Api.Components.EmailSender;
using Api.Components.SetPasswordEmail;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Specialized;
using System.Threading.Tasks;
using Api.Common.Exceptions;
using UnitTests.Components.Asserts;
using UnitTests.Components.Helpers;

namespace Api.UnitTests.Components.ResetPassword
{
    [TestClass]
    public class SetPasswordEmailServiceUnitTest
    {
        private AutoMock _mock;
        private SetPasswordEmailService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<SetPasswordEmailService>();
        }

        [TestMethod]
        public async Task ShouldGenerateAndSendPasswordResetToken()
        {
            var user = new User()
            {
                Id = Guid.NewGuid(),
                Email = "some@email.com"
            };
            var link = "link";
            var clientUrl = "url";
            var subject = "subject";
            var body = "body";
            var token = "token";

            var response = SendGridHelper.GetEmptyResponse(System.Net.HttpStatusCode.Accepted);

            _mock.Mock<IClientUriService>()
                .Setup(x => x.BuildUri(clientUrl, new NameValueCollection() {
                    { "userId", user.Id.ToString() },
                    { "code", token },
                }))
                .Returns(link);

            _mock.Mock<IEmailService>()
                .Setup(x => x.SendAsync(It.Is<SendSingleEmailRequest>(request => request.Email == user.Email && request.Subject == subject && request.Content == body)))
                .ReturnsAsync(response);

            await _service.GenerateAndSendTokenAsync(user, token, clientUrl, subject, body);

            _mock.Mock<IEmailService>()
                .Verify(x => x.SendAsync(It.Is<SendSingleEmailRequest>(request => request.Email == user.Email && request.Subject == subject && request.Content == body)));
        }

        [TestMethod]
        public void ShouldThrowCanNotSendEmailException()
        {
            var user = new User()
            {
                Id = Guid.NewGuid(),
                Email = "some@email.com"
            };
            var link = "link";
            var clientUrl = "url";
            var subject = "subject";
            var body = "body";
            var token = "token";

            var response = SendGridHelper.GetEmptyResponse(System.Net.HttpStatusCode.BadRequest);

            _mock.Mock<IClientUriService>()
                .Setup(x => x.BuildUri(clientUrl, new NameValueCollection() {
                    { "userId", user.Id.ToString() },
                    { "code", token },
                }))
                .Returns(link);

            _mock.Mock<IEmailService>()
                .Setup(x => x.SendAsync(It.Is<SendSingleEmailRequest>(request => request.Email == user.Email && request.Subject == subject && request.Content == body)))
                .ReturnsAsync(response);

            var expected = new CanNotSendEmailException(response.StatusCode.ToString());
            ExceptionAssert.ThrowsAsync(expected, () => _service.GenerateAndSendTokenAsync(user, token, clientUrl, subject, body));
        }
    }
}
