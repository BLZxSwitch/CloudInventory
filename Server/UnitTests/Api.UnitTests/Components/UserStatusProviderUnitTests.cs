using System;
using System.Threading.Tasks;
using Api.Components.UserStatusProvider;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components
{
    [TestClass]
    public class UserStatusProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ReturnsTrueWhenUserIsActive()
        {
            var userId = new Guid("{D80B76DB-3AB2-41E7-99FB-FB23605D7A8B}");
            var user = new User {Id = userId, SecurityUser = new SecurityUser {IsActive = true}};

            _mock.Mock<IInventContext>()
                .Setup(context => context.Users)
                .ReturnsAsDbSet(user);

            var provider = _mock.Create<UserActiveStatusProvider>();
            var actual = await provider.IsActiveAsync(userId);

            Assert.IsTrue(actual);
        }

        [TestMethod]
        public async Task ReturnsFalseWhenUserIsActive()
        {
            var userId = new Guid("{D80B76DB-3AB2-41E7-99FB-FB23605D7A8B}");
            var user = new User {Id = userId, SecurityUser = new SecurityUser {IsActive = false}};

            _mock.Mock<IInventContext>()
                .Setup(context => context.Users)
                .ReturnsAsDbSet(user);

            var provider = _mock.Create<UserActiveStatusProvider>();
            var actual = await provider.IsActiveAsync(userId);

            Assert.IsFalse(actual);
        }
    }
}