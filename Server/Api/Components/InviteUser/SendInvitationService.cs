using System;
using System.Threading.Tasks;
using Api.Components.Employees;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;

namespace Api.Components.InviteUser
{
    [As(typeof(ISendInvitationService))]
    public class SendInvitationService : ISendInvitationService
    {
        private readonly Func<IEmployeeProvider> _employeeProviderFactory;
        private readonly IInviteUserService _inviteUserService;
        private readonly IEmployeesService _employeesService;
        private readonly Func<IInventContext> _contextFactory;
        private readonly IMarkAsInvitedService _markAsInvitedService;

        public SendInvitationService(Func<IEmployeeProvider> employeeProviderFactory,
            IInviteUserService inviteUserService,
            IEmployeesService employeesService,
            Func<IInventContext> contextFactory,
            IMarkAsInvitedService markAsInvitedService)
        {
            _employeeProviderFactory = employeeProviderFactory;
            _inviteUserService = inviteUserService;
            _employeesService = employeesService;
            _contextFactory = contextFactory;
            _markAsInvitedService = markAsInvitedService;
        }

        public async Task SendInvitation(Guid employeeId)
        {
            using (var employeeProvider = _employeeProviderFactory())
            {
                var employee = await employeeProvider.GetByIdAsync(employeeId);

                await _inviteUserService.SendPasswordResetTokenAsync(employee.SecurityUser.User);

                await _markAsInvitedService.MarkAsync(employee.SecurityUser.Id);
            }
        }
    }
}