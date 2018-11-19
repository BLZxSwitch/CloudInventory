using System;
using System.Threading.Tasks;

namespace Api.Components.InviteUser
{
    public interface ISendInvitationService
    {
        Task SendInvitation(Guid employeeId);
    }
}
