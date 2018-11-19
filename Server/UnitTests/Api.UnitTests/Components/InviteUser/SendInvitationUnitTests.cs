using System;
using System.Threading.Tasks;
using Api.Components.Employees;
using Api.Components.InviteUser;
using Api.Profiles;
using Autofac.Extras.Moq;
using AutoMapper;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Components.InviteUser
{
    [TestClass]
    public class SendInvitationUnitTest
    {
        private AutoMock _mock;
        private SendInvitationService _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();

            _service = _mock.Create<SendInvitationService>();

            Mapper.Reset();

            Mapper.Initialize(cfg => { cfg.AddProfile<EmployeeProfile>(); });
        }

        [TestMethod]
        public async Task ShouldSendInvitation()
        {
            var employeeId = Guid.NewGuid();

            var employee = new Employee
            {
                Id = employeeId,
                SecurityUser = new SecurityUser
                {
                    Id = Guid.NewGuid(),
                    IsInvited = false,
                    User = new User()
                }
            };

            _mock.Mock<IEmployeeProvider>()
                .Setup(provider => provider.GetByIdAsync(employeeId))
                .ReturnsAsync(employee);

            await _service.SendInvitation(employeeId);

            _mock.Mock<IInviteUserService>()
                .Verify(service => service.SendPasswordResetTokenAsync(employee.SecurityUser.User), Times.Once);

            _mock.Mock<IMarkAsInvitedService>()
                .Verify(service => service.MarkAsync(employee.SecurityUser.Id), Times.Once);
        }
    }
}
