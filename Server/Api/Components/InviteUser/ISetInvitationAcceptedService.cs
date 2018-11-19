using System;
using System.Threading.Tasks;

namespace Api.Components.InviteUser
{
    public interface ISetInvitationAcceptedService
    {
        Task SetInvitationAccepted(Guid securityUserId);
    }
}