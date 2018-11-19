using Api.Components.CurrentEmployeeProvider;
using Api.Components.CurrentTenantProvider;
using Api.Components.Employees;
using Api.Components.Identities;
using Api.Controllers;
using Api.Transports.Employees;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class EmployeesControllerUnitTests
    {
        private AutoMock _mock;
        private EmployeesController _controller;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _controller = _mock.Create<EmployeesController>();
        }

        [TestMethod]
        public async Task ShouldReturnAllEmployeesOfAdminsCompany()
        {
            var tenantId = Guid.NewGuid();

            var expected = new List<EmployeeDTO>()
            {
                new EmployeeDTO(),
            };

            _mock.Mock<ICurrentTenantProvider>()
                .Setup(provider => provider.GetTenantIdAsync(It.IsAny<ClaimsPrincipal>()))
                .ReturnsAsync(tenantId);

            _mock.Mock<IEmployeesService>()
                .Setup(service => service.GetAllAsync(tenantId))
                .ReturnsAsync(expected);

            var actual = await _controller.GetAll();

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldAddEmployeeAndReturnOneWithId()
        {
            var userId = new Guid("{155E521A-3D64-46C7-939E-8A3FC29DD201}");

            var employee = new EmployeeDTO();

            var expected = new EmployeeDTO()
            {
                Id = Guid.NewGuid(),
            };

            _mock.Mock<IUserManager>()
                .Setup(manager => manager.GetUserId(It.IsAny<ClaimsPrincipal>()))
                .Returns(userId);

            _mock.Mock<IEmployeesService>()
                .Setup(service => service.AddAsync(employee, userId))
                .ReturnsAsync(expected);

            var actual = await _controller.Add(employee);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldUpdateEmployeeAndReturnOneWithId()
        {
            var expected = new EmployeeDTO()
            {
                Id = Guid.NewGuid(),
            };

            _mock.Mock<IEmployeesService>()
                .Setup(service => service.UpdateAsync(expected))
                .ReturnsAsync(expected);

            var actual = await _controller.Update(expected);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldDeleteEmployee()
        {
            var employeeId = Guid.NewGuid();
            var request = new EmployeeDeleteRequest()
            {
                EmployeeId = employeeId,
            };

            await _controller.Delete(request);

            _mock.Mock<IEmployeesService>()
                .Verify(service => service.DeleteAsync(employeeId));
        }
    }
}