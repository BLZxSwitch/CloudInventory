using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Components.CurrentEmployeeProvider
{
    public interface ICurrentEmployeeProvider
    {
        Task<Guid> GetEmployeeIdAsync(ClaimsPrincipal claimsPrincipal);
    }
}