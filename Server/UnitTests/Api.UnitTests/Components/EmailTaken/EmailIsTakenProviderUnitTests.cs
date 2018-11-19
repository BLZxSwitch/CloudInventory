using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.EmailTaken;
using Api.Components.Employees;
using Api.Components.Identities;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Components.EmailTaken
{
    [TestClass]
    public class EmailIsTakenProviderUnitTests
    {
        private AutoMock _mock;
        private EmailIsTakenProvider _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _provider = _mock.Create<EmailIsTakenProvider>();
        }

        [TestMethod]
        public async Task ReturnsFalseWhenThereIsNotUserWithSuchEmail()
        {
            var email = "m@m";

            _mock.Mock<IUserManager>()
                .Setup(context => context.FindByEmailAsync(email))
                .ReturnsAsync((User)null);

            var actual = await _provider.IsTaken(email);

            Assert.IsFalse(actual);
        }

        [TestMethod]
        public async Task ReturnsTrueWhenThereIsUserWithSuchEmail()
        {
            var email = "m@m";

            _mock.Mock<IUserManager>()
                .Setup(context => context.FindByEmailAsync(email))
                .ReturnsAsync(new User());

            var actual = await _provider.IsTaken(email);

            Assert.IsTrue(actual);
        }

        [TestMethod]
        public async Task WithSelfEmployeeIdReturnsFalseWhenThereIsNotUserWithSuchEmail()
        {
            var email = "m@m";
            var selfEmployeeId = Guid.NewGuid();

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync((User)null);

            var actual = await _provider.IsTaken(email, selfEmployeeId);

            Assert.IsFalse(actual);
        }

        [TestMethod]
        public async Task WithSelfEmployeeIdReturnsFalseWhenThereIsUserWithSuchEmailAndSuchId()
        {
            var email = "m@m";
            var selfEmployeeId = Guid.NewGuid();
            var user = new User()
            {
                SecurityUser = new SecurityUser()
                {
                    Employee = new Employee()
                    {
                        Id = selfEmployeeId
                    }
                }
            };

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync(user);

            var actual = await _provider.IsTaken(email, selfEmployeeId);

            Assert.IsFalse(actual);
        }

        [TestMethod]
        public async Task WithSelfEmployeeIdReturnsTrueWhenThereIsUserWithSuchEmail()
        {
            var email = "m@m";
            var selfEmployeeId = Guid.NewGuid();
            var user = new User()
            {
                SecurityUser = new SecurityUser()
                {
                    Employee = new Employee()
                    {
                        Id = Guid.NewGuid()
                    }
                }
            };

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.FindByEmailAsync(email))
                .ReturnsAsync(user);

            var actual = await _provider.IsTaken(email, selfEmployeeId);

            Assert.IsTrue(actual);
        }
    }
}
