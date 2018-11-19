using EF.Models.Models;
using System;
using System.Threading.Tasks;

namespace Api.Components.Tenants
{
    public interface ITenantProvider : IDisposable
    {
        Task<Tenant> GetByIdAsync(Guid tenantId);
    }
}
