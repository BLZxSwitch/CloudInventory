using Api.Components.CurrentEmployeeProvider;
using Api.Components.CurrentUserProvider;
using Api.Components.Employees;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.UnitTests.Components
{
    [TestClass]
    public class CurrentEmployeeProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ReturnsEmployee()
        {
            var claimsPrincipal = new ClaimsPrincipal();
            var employeeId = new Guid("{506F9CF8-239F-4280-8CAC-15EF66FEE37F}");
            var user = new User
            {
                SecurityUser = new SecurityUser
                {
                    Employee = new Employee
                    {
                        Id = employeeId
                    }
                }
            };

            _mock.Mock<ICurrentUserProvider>()
                .Setup(instance => instance.GetUserAsync(claimsPrincipal))
                .ReturnsAsync(user);

            var provider = _mock.Create<CurrentEmployeeProvider>();
            var actual = await provider.GetEmployeeIdAsync(claimsPrincipal);

            Assert.AreEqual(employeeId, actual);
        }
    }
}