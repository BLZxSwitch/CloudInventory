using System;
using System.Threading.Tasks;

namespace Api.Components.TermsOfService
{
    public interface IUserToSService
    {
        Task AcceptAsync(Guid securityUserId);

        Task<bool> IsAcceptedAsync(Guid securityUserId);
    }
}