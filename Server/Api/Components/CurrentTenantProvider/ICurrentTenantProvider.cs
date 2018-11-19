using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Components.CurrentTenantProvider
{
    public interface ICurrentTenantProvider
    {
        Task<Guid> GetTenantIdAsync(ClaimsPrincipal claimsPrincipal);
    }
}