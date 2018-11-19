using Api.Components.NowProvider;
using Api.Components.SecurityUsers;
using Api.Components.TermsOfService;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Api.UnitTests.Components.InviteUser
{
    [TestClass]
    public class UserToSServiceUnitTest
    {
        private AutoMock _mock;
        private UserToSService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<UserToSService>();
        }

        [TestMethod]
        public async Task ShouldAcceptToS()
        {
            var securityUserId = Guid.NewGuid();

            var now = DateTime.Now;

            var securityUser = new SecurityUser
            {
                Id = securityUserId,
                IsInvited = false,
                User = new User()
            };

            _mock.Mock<ISecurityUserProvider>()
                .Setup(provider => provider.GetByIdAsync(securityUserId))
                .ReturnsAsync(securityUser);

            _mock.Mock<INowProvider>()
                .Setup(provider => provider.Now())
                .Returns(now);

            await _service.AcceptAsync(securityUserId);

            Assert.AreEqual(securityUser.ToSAcceptedDate, now);

            _mock.Mock<IInventContext>()
                .Verify(context => context.Update(securityUser), Times.Once);

            _mock.Mock<IInventContext>()
                .Verify(context => context.SaveChangesAsync(default(CancellationToken)), Times.Once);
        }
    }
}
