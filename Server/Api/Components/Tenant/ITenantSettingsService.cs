using Api.Transports.Tenant;
using System;
using System.Threading.Tasks;

namespace Api.Components.Tenants
{
    public interface ITenantSettingsService
    {
        Task<TenantSettingsDTO> GetByTenantIdAsync(Guid tenantId);
        Task<TenantSettingsDTO> UpdateAsync(TenantSettingsDTO tenantSettings, Guid tenantId);
    }
}