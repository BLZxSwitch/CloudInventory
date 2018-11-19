using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;
using Api.Components.Dashboard;

namespace Api.UnitTests.Components.DashboardItems
{
    [TestClass]
    public class DashboardItemsServiceUnitTests
    {
        private AutoMock _mock;
        private DashboardItemsService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<DashboardItemsService>();
        }

        [TestMethod]
        public async Task HasOnlyAdminUsersShouldReturnTrue()
        {
            var tenantId = Guid.NewGuid();

            var employees = new List<Employee>
            {
                new Employee
                {
                    TenantId = tenantId,
                    SecurityUser = new SecurityUser()
                    {
                        User = new User()
                        {
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
                        }
                    }
                },
            };

            var expected = true;

            _mock.Mock<IInventContext>()
                .Setup(context => context.Employees)
                .ReturnsAsDbSet(employees);

            var actual = await _service.HasOnlyAdminUsers(tenantId);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task HasOnlyAdminUsersShouldReturnFalse()
        {
            var tenantId = Guid.NewGuid();

            var employees = new List<Employee>
            {
                new Employee
                {
                    TenantId = tenantId,
                    SecurityUser = new SecurityUser()
                    {
                        User = new User()
                        {
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
                        }
                    }
                },
                new Employee
                {
                    TenantId = tenantId,
                    SecurityUser = new SecurityUser()
                    {
                        User = new User()
                        {
                            Roles = new List<UserRole>()
                            {
                                new UserRole()
                                {
                                    RoleId = UserRoles.Employee.RoleId
                                },
                            },
                        }
                    }
                },
            };

            var expected = false;

            _mock.Mock<IInventContext>()
                .Setup(context => context.Employees)
                .ReturnsAsDbSet(employees);

            var actual = await _service.HasOnlyAdminUsers(tenantId);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}