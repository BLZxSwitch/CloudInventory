using Api.Components.Employees;
using Autofac.Extras.Moq;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Api.UnitTests.Components.Employees
{
    [TestClass]
    public class EmployeeUserTransformerUnitTests
    {
        private AutoMock _mock;
        private EmployeeUserTransformer _provider;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _provider = _mock.Create<EmployeeUserTransformer>();
        }

        [TestMethod]
        public void ShouldReturnUser()
        {
            var userId = Guid.NewGuid();
            var employeeId = Guid.NewGuid();

            var employee = new Employee()
            {
                Id = employeeId,
                SecurityUser = new SecurityUser()
                {
                    User = new User()
                    {
                        Id = userId,
                    },
                },
            };

            var expected = new User()
            {
                Id = userId,
                SecurityUser = new SecurityUser()
                {
                    Employee = new Employee()
                    {
                        Id = employeeId,
                    }
                }
            };

            var actual = _provider.Transform(employee);

            Assert.AreEqual(userId, actual.Id);

            Assert.AreEqual(employeeId, actual.SecurityUser.Employee.Id);
        }

        [TestMethod]
        public void ShouldReturnEmployee()
        {
            var userId = Guid.NewGuid();
            var employeeId = Guid.NewGuid();

            var user = new User()
            {
                Id = userId,
                SecurityUser = new SecurityUser()
                {
                    Employee = new Employee()
                    {
                        Id = employeeId,
                    }
                }
            };

            var expected = new Employee()
            {
                Id = employeeId,
                SecurityUser = new SecurityUser()
                {
                    User = new User()
                    {
                        Id = userId,
                    },
                },
            };

            var actual = _provider.Transform(user);

            Assert.AreEqual(employeeId, actual.Id);

            Assert.AreEqual(userId, actual.SecurityUser.User.Id);
        }
    }
}
