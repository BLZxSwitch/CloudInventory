using Api.Components.CompanyRegister;
using Api.Components.Identities;
using Api.Transports.CompanyRegister;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.CompanyRegister
{
    [TestClass]
    public class CompanyRegisterServiceUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _mock.Create<CompanyRegisterService>();
        }

        [TestMethod]
        public async Task ReturnsToken()
        {
            const string password = "Password";
            var userId = new Guid("{DBFA17BB-6F85-48AE-B5C1-9B5D7DF1657A}");
            var tenantId = Guid.NewGuid();

            var request = new CompanyRegisterRequest
            {
                Password = password
            };

            var user = new User()
            {
                SecurityUser = new SecurityUser()
                {
                    TenantId = tenantId
                }
            };

            var roles = new List<Role>
                {
                    new Role {Id = UserRoles.CompanyAdministrator.RoleId},
                    new Role {Id = UserRoles.Employee.RoleId}
                };

            _mock.Mock<ICompanyRegisterRequestToUserConverter>()
                .Setup(converter => converter.Convert(request))
                .Returns(user);

            _mock.Mock<IUserManager>()
                .Setup(instance => instance.CreateAsync(user, password))
                .Callback((User u, string p) => u.Id = userId)
                .ReturnsAsync(IdentityResult.Success);

            _mock.Mock<IInventContext>()
                .Setup(converter => converter.Roles)
                .ReturnsAsDbSet(roles);

            _mock.Mock<IInventContext>()
                .Setup(converter => converter.UserRoles)
                .ReturnsAsDbSet(new List<UserRole>());

            var service = _mock.Create<CompanyRegisterService>();
            var actual = await service.Register(request);

            Assert.AreEqual(userId, actual);

            _mock.Mock<ICompanyRegisterEmailNotificationService>()
                .Verify(instance => instance.SendAsync(user));

            _mock.Mock<ICompanyRegisterInternalEmailNotificationService>()
                .Verify(instance => instance.SendAsync(user));
        }
    }
}