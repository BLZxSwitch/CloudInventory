using Api.Providers.CompanyProviders;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Providers.CompanyProviders
{
    [TestClass]
    public class UserCompanyProviderUnitTests
    {
        private AutoMock _mock;
        private UserCompanyProvider _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _provider = _mock.Create<UserCompanyProvider>();
        }

        [TestMethod]
        public async Task ShouldReturnAllEmployeesOfAdminsCompany()
        {
            var userId = Guid.NewGuid();
            var employeeId = Guid.NewGuid();
            var expected = new Company()
            {
                Employees = new List<Employee>()
                {
                    new Employee()
                    {
                        Id = employeeId,
                        SecurityUser = new SecurityUser()
                        {
                            UserId = userId,
                        },
                    },
                },
            };

            var companies = new List<Company>()
            {
                expected
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.Companies)
                .ReturnsAsDbSet(companies);

            var actual = await _provider.GetAsync(userId);

            ContentAssert.AreEqual(expected, actual);
        }
    }
}
