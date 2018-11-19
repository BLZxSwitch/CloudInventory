using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Components.Dashboard;
using Autofac.Extras.Moq;
using AutoMapper;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using UnitTests.Components.Asserts;
using System.Security.Claims;
using Api.Components.CurrentUserProvider;

namespace Api.UnitTests.Components.Dashboard
{
    [TestClass]
    public class DashboardServiceUnitTests
    {
        private AutoMock _mock;
        private DashboardService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<DashboardService>();

            Mapper.Reset();
        }

        [TestMethod]
        public async Task ShouldReturnDashboardSummaryResponseForAdmins()
        {
            var tenantId = Guid.NewGuid();
            var claimsPrincipal = new ClaimsPrincipal();
            var user = new User()
            {
                SecurityUser = new SecurityUser()
                {
                    TenantId = tenantId,
                    Employee = new Employee()
                },
                Roles = new List<UserRole>()
                {
                    new UserRole()
                    {
                        RoleId = UserRoles.Employee.RoleId
                    },
                    new UserRole()
                    {
                        RoleId = UserRoles.CompanyAdministrator.RoleId
                    },
                },
            };

            var expected = new DashboardSummaryResponse()
            {
                HasOnlyAdminUsers = true
            };

            _mock.Mock<ICurrentUserProvider>()
                .Setup(serice => serice.GetUserAsync(claimsPrincipal))
                .ReturnsAsync(user);

            _mock.Mock<IDashboardItemsService>()
                .Setup(serice => serice.HasOnlyAdminUsers(tenantId))
                .ReturnsAsync(true);

            var actual = await _service.GetSummaryAsync(claimsPrincipal);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldReturnDashboardSummaryResponseForOrgUnitLeader()
        {
            var tenantId = Guid.NewGuid();
            var claimsPrincipal = new ClaimsPrincipal();
            var user = new User()
            {
                SecurityUser = new SecurityUser()
                {
                    TenantId = tenantId,
                    Employee = new Employee()
                },
                Roles = new List<UserRole>()
                {
                    new UserRole()
                    {
                        RoleId = UserRoles.Employee.RoleId
                    },
                },
            };

            var expected = new DashboardSummaryResponse()
            {
                HasOnlyAdminUsers = false
            };

            _mock.Mock<ICurrentUserProvider>()
                .Setup(serice => serice.GetUserAsync(claimsPrincipal))
                .ReturnsAsync(user);

            _mock.Mock<IDashboardItemsService>()
                .Setup(serice => serice.HasOnlyAdminUsers(tenantId))
                .ReturnsAsync(true);

            var actual = await _service.GetSummaryAsync(claimsPrincipal);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldReturnDashboardSummaryResponseForUser()
        {
            var tenantId = Guid.NewGuid();
            var claimsPrincipal = new ClaimsPrincipal();
            var user = new User()
            {
                SecurityUser = new SecurityUser()
                {
                    TenantId = tenantId,
                    Employee = new Employee()
                },
                Roles = new List<UserRole>()
                {
                    new UserRole()
                    {
                        RoleId = UserRoles.Employee.RoleId
                    },
                },
            };

            var expected = new DashboardSummaryResponse()
            {
                HasOnlyAdminUsers = false
            };

            _mock.Mock<ICurrentUserProvider>()
                .Setup(serice => serice.GetUserAsync(claimsPrincipal))
                .ReturnsAsync(user);

            _mock.Mock<IDashboardItemsService>()
                .Setup(serice => serice.HasOnlyAdminUsers(tenantId))
                .ReturnsAsync(true);

            var actual = await _service.GetSummaryAsync(claimsPrincipal);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}