using System;
using System.Collections.Generic;
using Api.Components.Employees;
using Api.Components.GuidsProviders;
using Api.Providers.CompanyProviders;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Components.Employees
{
    [TestClass]
    public class PrepareEmployeeForAddingProviderUnitTests
    {
        private AutoMock _mock;
        private PrepareEmployeeForAddingProvider _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _provider = _mock.Create<PrepareEmployeeForAddingProvider>();
        }

        [TestMethod]
        public void ShouldReturnUser()
        {
            var userId = Guid.NewGuid();
            var employeeId = Guid.NewGuid();
            var companyId = Guid.NewGuid();
            var tenantId = Guid.NewGuid();
            var concurrencyStamp = Guid.NewGuid();
            var company = new Company
            {
                Id = companyId,
                TenantId = tenantId
            };

            var employee = new Employee
            {
                Id = employeeId,
                SecurityUser = new SecurityUser
                {
                    IsActive = false,
                    User = new User
                    {
                        Id = userId
                    }
                }
            };

            var expected = new Employee
            {
                Id = employeeId,
                CompanyId = companyId,
                TenantId = tenantId,
                SecurityUser = new SecurityUser
                {
                    IsActive = false,
                    TenantId = company.TenantId,
                    User = new User
                    {
                        Id = userId,
                        ConcurrencyStamp = concurrencyStamp.ToString(),
                        Roles = new List<UserRole>
                        {
                            new UserRole {RoleId = UserRoles.Employee.RoleId}
                        }
                    }
                }
            };

            _mock.Mock<IUserCompanyProvider>()
                .Setup(context => context.GetAsync(userId))
                .ReturnsAsync(company);

            _mock.Mock<INewGuidProvider>()
                .Setup(context => context.Get())
                .Returns(concurrencyStamp);

            var actual = _provider.Prepare(employee, company);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}