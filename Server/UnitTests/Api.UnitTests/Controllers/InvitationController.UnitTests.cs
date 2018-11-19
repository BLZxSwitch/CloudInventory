using Api.Controllers;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading.Tasks;
using Api.Common.Exceptions;
using Api.Components.InviteUser;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class InvitationControllerUnitTests
    {
        private AutoMock _mock;
        private InvitationController _controller;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _controller = _mock.Create<InvitationController>();
        }

        [TestMethod]
        public async Task ShouldSendInvitationAndReturnEmployee()
        {
            var employeeId = Guid.NewGuid();

            await _controller.SendInvitation(employeeId);

            _mock.Mock<ISendInvitationService>()
                .Verify(context => context.SendInvitation(employeeId), Times.Once);
        }

        [TestMethod]
        public async Task ShouldThrowException()
        {
            var employeeId = Guid.NewGuid();
            var exception = new CanNotSendEmailException("ERROR");
            var expected = new BadRequestException("INVITE_IS_NOT_SEND");

            _mock.Mock<ISendInvitationService>()
                .Setup(context => context.SendInvitation(employeeId))
                .Throws(exception);

            ExceptionAssert.ThrowsAsync(expected, () => _controller.SendInvitation(employeeId));
        }
    }
}