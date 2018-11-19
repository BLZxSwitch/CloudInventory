﻿using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Components.InviteUser;
using Api.Components.SecurityUsers;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Components.InviteUser
{
    [TestClass]
    public class SetInvitationAcceptedServiceUnitTests
    {
        private AutoMock _mock;
        private SetInvitationAcceptedService _controller;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _controller = _mock.Create<SetInvitationAcceptedService>();
        }

        [TestMethod]
        public async Task ShouldMarkEployeeAsInvited()
        {
            var securityUserId = Guid.NewGuid();

            var securityUser = new SecurityUser
            {
                Id = securityUserId,
                IsInvited = false,
                User = new User()
            };

            _mock.Mock<ISecurityUserProvider>()
                .Setup(provider => provider.GetByIdAsync(securityUserId))
                .ReturnsAsync(securityUser);

            await _controller.SetInvitationAccepted(securityUserId);

            Assert.AreEqual(securityUser.IsInvitationAccepted, true);

            _mock.Mock<IInventContext>()
                .Verify(context => context.Update(securityUser), Times.Once);

            _mock.Mock<IInventContext>()
                .Verify(context => context.SaveChangesAsync(default(CancellationToken)), Times.Once);
        }

    }
}
