using Api.Common.Exceptions;
using Api.Components.Employees;
using Api.Providers.CompanyProviders;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.Employees
{
    [TestClass]
    public class EmployeeProviderUnitTests
    {
        private AutoMock _mock;
        private EmployeeProvider _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _provider = _mock.Create<EmployeeProvider>();
        }

        [TestMethod]
        public async Task ShouldReturnEmployee()
        {
            var employeeId = Guid.NewGuid();
            var companyId = Guid.NewGuid();
            var tenantId = Guid.NewGuid();

            var expected = new Employee()
            {
                Id = employeeId,
                CompanyId = companyId,
                TenantId = tenantId,
            };
            var employees = new List<Employee>()
            {
                expected,
                new Employee()
                {
                    Id = Guid.NewGuid(),
                }
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.Employees)
                .ReturnsAsDbSet(employees);

            var actual = await _provider.GetByIdAsync(employeeId);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}
