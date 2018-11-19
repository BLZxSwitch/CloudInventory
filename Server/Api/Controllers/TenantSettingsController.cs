using System.Threading.Tasks;
using Api.Components.CurrentTenantProvider;
using Api.Components.Security;
using Api.Components.Tenants;
using Api.Transports.Tenant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [CompanyAdministrator]
    public class TenantSettingsController : Controller
    {
        private readonly ICurrentTenantProvider _currentTenantProvider;
        private readonly ITenantSettingsService _tenantSettingsService;

        public TenantSettingsController(
            ICurrentTenantProvider currentTenantProvider,
            ITenantSettingsService tenantSettingsService)
        {
            _tenantSettingsService = tenantSettingsService;
            _currentTenantProvider = currentTenantProvider;
        }

        [HttpGet]
        public async Task<TenantSettingsDTO> Get()
        {
            var tenantId = await _currentTenantProvider.GetTenantIdAsync(User);

            return await _tenantSettingsService.GetByTenantIdAsync(tenantId);
        }

        [HttpPut]
        public async Task<TenantSettingsDTO> Update([FromBody]TenantSettingsDTO tenantSettings)
        {
            var tenantId = await _currentTenantProvider.GetTenantIdAsync(User);

            return await _tenantSettingsService.UpdateAsync(tenantSettings, tenantId);
        }
    }
}