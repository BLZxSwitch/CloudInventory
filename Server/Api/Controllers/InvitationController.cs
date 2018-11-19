using System;
using System.Threading.Tasks;
using Api.Common.Exceptions;
using Api.Components.InviteUser;
using Api.Components.Security;
using Api.Filters.ModelStateFilter;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [CompanyAdministrator]
    public class InvitationController
    {
        private readonly ISendInvitationService _sendInvitationService;

        public InvitationController(ISendInvitationService sendInvitationService)
        {
            _sendInvitationService = sendInvitationService;
        }


        [HttpPost]
        [ModelStateFilter]
        public async Task SendInvitation([FromBody] Guid employeeId)
        {
            try
            {
                await _sendInvitationService.SendInvitation(employeeId);
            }
            catch (CanNotSendEmailException)
            {
                throw new BadRequestException("INVITE_IS_NOT_SEND");
            }
            
        }

    }
}
