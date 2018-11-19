using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;
using Api.Components.Identities;
using Api.Transports.Common;
using EF.Models.Models;
using EF.Models;
using Moq;
using Api.Components.SignIn;
using AutoMapper;
using Api.Components.Jwt.CreateJwtTokenAsStringService;
using System.Linq;
using Api.Transports.SignIn;

namespace Api.UnitTests.Components.SignIn
{
    [TestClass]
    public class SignInResponseProviderUnitTests
    {
        private AutoMock _mock;
        private SignInResponseProvider _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _provider = _mock.Create<SignInResponseProvider>();
        }

        [TestMethod]
        public void ShouldReturnSignInResponseByUser()
        {
            const string email = "max@m.m";
            Guid userId = Guid.NewGuid();
            const string token = "token";
            const bool rememberMe = true;

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

            var rolesFalt = roles.Select(r => r.Role.Name).ToList();

            var user = new User()
            {
                Id = userId,
                Email = email,
                Roles = roles,
            };

            var userDTO = new UserDTO
            {
                Email = email,
                Roles = rolesFalt,
            };

            var expected = new SignInResponse
            {
                Token = token,
                User = userDTO
            };

            _mock.Mock<ICreateJwtTokenAsStringService>()
                .Setup(service => service.Create(userId, rememberMe, rolesFalt))
                .Returns(token);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<UserDTO>(user))
                .Returns(userDTO);

            var actual = _provider.Get(user, rememberMe);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldReturnSignInResponseByUserId()
        {
            const string email = "max@m.m";
            Guid userId = Guid.NewGuid();
            const string token = "token";
            const bool rememberMe = true;

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

            var rolesFalt = roles.Select(r => r.Role.Name).ToList();

            var user = new User()
            {
                Id = userId,
                Email = email,
                Roles = roles,
            };

            var userDTO = new UserDTO
            {
                Email = email,
                Roles = rolesFalt,
            };

            var expected = new SignInResponse
            {
                Token = token,
                User = userDTO
            };

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.FindByIdAsync(userId))
                .ReturnsAsync(user);

            _mock.Mock<ICreateJwtTokenAsStringService>()
                .Setup(service => service.Create(userId, rememberMe, rolesFalt))
                .Returns(token);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<UserDTO>(user))
                .Returns(userDTO);

            var actual = await _provider.GetAsync(userId, rememberMe);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}
