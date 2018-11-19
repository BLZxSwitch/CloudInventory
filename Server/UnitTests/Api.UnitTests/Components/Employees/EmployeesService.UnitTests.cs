using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Components.Employees;
using Api.Components.Identities;
using Api.Components.Roles;
using Api.Profiles;
using Api.Providers.CompanyProviders;
using Api.Transports.Employees;
using Autofac.Extras.Moq;
using AutoMapper;
using EF.Models;
using EF.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using UnitTests.Components.Asserts;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.Employees
{
    [TestClass]
    public class EmployeesServiceUnitTests
    {
        private AutoMock _mock;
        private EmployeesService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<EmployeesService>();

            Mapper.Reset();

            Mapper.Initialize(cfg => { cfg.AddProfile<EmployeeProfile>(); });
        }

        [TestMethod]
        public async Task ShouldReturnAllEmployeesOfAdminsCompany()
        {
            var tenantId = Guid.NewGuid();
            var employeeId = Guid.NewGuid();
            var isActive = true;

            var employees = new List<Employee>
            {
                new Employee
                {
                    Id = employeeId,
                    FirstName = "FirstName",
                    LastName = "LastName",
                    PatronymicName = "PatronymicName",
                    TenantId = tenantId,
                    SecurityUser = new SecurityUser
                    {
                        User = new User
                        {
                            Roles = new List<UserRole>()
                        },
                        IsActive = isActive
                    }
                },
                new Employee
                {
                    Id = Guid.NewGuid(),
                    FirstName = "FirstName",
                    LastName = "LastName",
                    PatronymicName = "PatronymicName",
                    TenantId = Guid.NewGuid(),
                    SecurityUser = new SecurityUser
                    {
                        User = new User
                        {
                            Roles = new List<UserRole>()
                        },
                        IsActive = isActive
                    }
                },
            };

            var expected = new List<EmployeeDTO>
            {
                new EmployeeDTO
                {
                    Id = employeeId,
                    IsActive = isActive,
                    FirstName = "FirstName",
                    LastName = "LastName",
                    PatronymicName = "PatronymicName",
                    FullName = "FirstName LastName PatronymicName",
                }
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.Employees)
                .ReturnsAsDbSet(employees);

            var actual = await _service.GetAllAsync(tenantId);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldAddEmployee()
        {
            var userId = Guid.NewGuid();
            var employeeId = Guid.NewGuid();
            var company = new Company();

            var employee = new Employee
            {
                Id = employeeId,
                SecurityUser = new SecurityUser
                {
                    User = new User()
                }
            };

            var user = new User
            {
                SecurityUser = new SecurityUser
                {
                    Employee = new Employee()
                }
            };

            var expected = new EmployeeDTO
            {
                Id = employeeId
            };

            var employeeDTO = new EmployeeDTO();

            _mock.Mock<IUserCompanyProvider>()
                .Setup(provider => provider.GetAsync(userId))
                .ReturnsAsync(company);

            _mock.Mock<IPrepareEmployeeForAddingProvider>()
                .Setup(provider => provider.Prepare(It.IsAny<Employee>(), company))
                .Returns(employee);

            _mock.Mock<IEmployeeUserTransformer>()
                .Setup(provider => provider.Transform(employee))
                .Returns(user);

            _mock.Mock<IUserManager>()
                .Setup(provider => provider.CreateAsync(user))
                .ReturnsAsync(IdentityResult.Success)
                .Callback((User u) =>
                {
                    u.Id = userId;
                    u.SecurityUser.Employee.Id = employeeId;
                    employee.Id = employeeId;
                    employee.SecurityUser.User.Id = userId;
                });

            _mock.Mock<IEmployeeUserTransformer>()
                .Setup(provider => provider.Transform(user))
                .Returns(employee);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<Employee, EmployeeDTO>(employee))
                .Returns(expected);

            var actual = await _service.AddAsync(employeeDTO, userId);

            _mock.Mock<IUserManager>()
                .Verify(manager => manager.CreateAsync(user), Times.Once);

            _mock.Mock<IRolesService>()
                .Verify(service => service.SetIsAdminStateAsync(user, employeeDTO.IsAdmin), Times.Once);

            _mock.Mock<IInventContext>()
                .Verify(context => context.Attach(user), Times.Once);

            ContentAssert.AreEqual(expected, actual);
        }

        [TestMethod]
        public async Task ShouldUpdateEmployee()
        {
            var employeeId = Guid.NewGuid();

            var employee = new Employee
            {
                Id = employeeId,
                SecurityUser = new SecurityUser
                {
                    User = new User()
                }
            };

            var expected = new EmployeeDTO
            {
                Id = employeeId
            };

            var employeeDTO = new EmployeeDTO
            {
                Id = employeeId
            };

            _mock.Mock<IEmployeeProvider>()
                .Setup(provider => provider.GetByIdAsync(employeeId))
                .ReturnsAsync(employee);

            _mock.Mock<IMapper>()
                .Setup(mapper => mapper.Map<Employee, EmployeeDTO>(employee))
                .Returns(expected);

            var actual = await _service.UpdateAsync(employeeDTO);

            ContentAssert.AreEqual(expected, actual);

            _mock.Mock<IInventContext>()
                .Verify(context => context.Update(employee), Times.Once);

            _mock.Mock<IInventContext>()
                .Verify(context => context.SaveChangesAsync(default(CancellationToken)), Times.Once);

            _mock.Mock<IRolesService>()
                .Verify(provider => provider.SetIsAdminStateAsync(employee.SecurityUser.User, employeeDTO.IsAdmin),
                    Times.Once);
        }

        [TestMethod]
        public async Task ShouldDeleteEmployee()
        {
            var employeeId = Guid.NewGuid();

            var employee = new Employee
            {
                Id = employeeId,
                SecurityUser = new SecurityUser
                {
                    User = new User()
                }
            };

            _mock.Mock<IEmployeeProvider>()
                .Setup(provider => provider.GetByIdAsync(employeeId))
                .ReturnsAsync(employee);

            await _service.DeleteAsync(employeeId);

            _mock.Mock<IUserManager>()
                .Verify(manager => manager.DeleteAsync(employee.SecurityUser.User));
        }
    }
}