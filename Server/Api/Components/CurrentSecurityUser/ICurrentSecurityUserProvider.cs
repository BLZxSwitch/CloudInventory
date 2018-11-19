using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Components.CurrentSecurityUser
{
    public interface ICurrentSecurityUserProvider
    {
        Task<Guid> GetSecurityUserIdAsync(ClaimsPrincipal claimsPrincipal);
    }
}