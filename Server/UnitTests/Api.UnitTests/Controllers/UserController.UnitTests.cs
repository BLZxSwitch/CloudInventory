using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Components.Identities;
using Api.Controllers;
using Api.Transports.Common;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;
using AutoMapper;
using System.Linq;
using Moq;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class UserControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ShouldReturnUserDTOOnMeAction()
        {
            const string email = "max@m.m";
            Guid userId = Guid.NewGuid();

            var roles = new List<UserRole>()
            {
                new UserRole()
                {
                    Role=new Role()
                    {
                        Name = UserRoles.Employee.Name,
                    }
                },
                new UserRole()
                {
                    Role=new Role()
                    {
                        Name = UserRoles.CompanyAdministrator.Name,
                    }
                },
            };

            var user = new User()
            {
                Id = userId,
                Email = email,
                Roles = roles,
            };

            var expected = new UserDTO
            {
                Email = email,
                Roles = roles.Select(r => r.Role.Name).ToList(),
            };

            var controller = _mock.Create<UserController>();

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.GetUserId(controller.User))
                .Returns(userId);

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.FindByIdAsync(userId))
                .ReturnsAsync(user);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<UserDTO>(user))
                .Returns(expected);

            var actual = await controller.Me();

            ContentAssert.AreEqual(expected, actual);
        }
    }
}