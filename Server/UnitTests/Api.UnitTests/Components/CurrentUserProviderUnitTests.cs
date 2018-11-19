using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.CurrentUserProvider;
using Api.Components.Identities;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Components
{
    [TestClass]
    public class CurrentUserProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ReturnsUser()
        {
            var claimsPrincipal = new ClaimsPrincipal();
            var userId = new Guid("{D80B76DB-3AB2-41E7-99FB-FB23605D7A8B}");
            var user = new User();

            _mock.Mock<IUserManager>()
                .Setup(context => context.GetUserId(claimsPrincipal))
                .Returns(userId);

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByIdAsync(userId))
                .ReturnsAsync(user);

            var provider = _mock.Create<CurrentUserProvider>();
            var actual = await provider.GetUserAsync(claimsPrincipal);

            Assert.AreSame(user, actual);
        }
    }
}