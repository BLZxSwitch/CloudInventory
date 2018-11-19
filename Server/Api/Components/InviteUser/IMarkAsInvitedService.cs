using System;
using System.Threading.Tasks;

namespace Api.Components.InviteUser
{
    public interface IMarkAsInvitedService
    {
        Task MarkAsync(Guid securityUserId);
    }
}