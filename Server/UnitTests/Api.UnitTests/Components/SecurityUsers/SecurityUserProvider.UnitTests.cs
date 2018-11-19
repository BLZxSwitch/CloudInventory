using Api.Components.SecurityUsers;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.OrganizationalUnits
{
    [TestClass]
    public class SecurityUserProviderUnitTests
    {
        private AutoMock _mock;
        private SecurityUserProvider _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _provider = _mock.Create<SecurityUserProvider>();
        }

        [TestMethod]
        public async Task ShouldReturnSecurityUserById()
        {
            var securityUserId = Guid.NewGuid();

            var expected = new SecurityUser()
            {
                Id = securityUserId,
            };
            var securityUsers = new List<SecurityUser>()
            {
                expected,
                new SecurityUser()
                {
                    Id = Guid.NewGuid(),
                }
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.SecurityUsers)
                .ReturnsAsDbSet(securityUsers);

            var actual = await _provider.GetByIdAsync(securityUserId);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldReturnSecurityUserByUserId()
        {
            var userId = Guid.NewGuid();

            var expected = new SecurityUser()
            {
                UserId = userId,
            };
            var securityUsers = new List<SecurityUser>()
            {
                expected,
                new SecurityUser()
                {
                    UserId = Guid.NewGuid(),
                }
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.SecurityUsers)
                .ReturnsAsDbSet(securityUsers);

            var actual = await _provider.GetByUserIdAsync(userId);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}
