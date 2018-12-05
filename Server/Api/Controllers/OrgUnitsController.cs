using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Components.CurrentTenantProvider;
using Api.Components.Identities;
using Api.Components.OrgUnits;
using Api.Components.Security;
using Api.Filters.ModelStateFilter;
using Api.Transports.OrgUnits;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class OrgUnitsController : Controller
    {
        private readonly IOrgUnitsService _orgUnitsService;
        private readonly Func<IUserManager> _userManagerFactory;
        private readonly ICurrentTenantProvider _currentTenantProvider;

        public OrgUnitsController(
            IOrgUnitsService orgUnitsService,
            ICurrentTenantProvider currentTenantProvider,
            Func<IUserManager> userManagerFactory)
        {
            _orgUnitsService = orgUnitsService;
            _userManagerFactory = userManagerFactory;
            _currentTenantProvider = currentTenantProvider;
        }

        [HttpGet]
        //[CompanyAdministrator]
        public async Task<IEnumerable<OrgUnitResponseDTO>> GetAll()
        {
            var tenantId = await _currentTenantProvider.GetTenantIdAsync(User);

            return await _orgUnitsService.GetAllAsync(tenantId);
        }

        [HttpPost]
        [ModelStateFilter]
        [CompanyAdministrator]
        public async Task<OrgUnitResponseDTO> AddOrgUnit([FromBody] OrgUnitRequestDTO orgUnitDTO)
        {
            using (var userManager = _userManagerFactory())
            {
                var userId = userManager.GetUserId(User);

                var orgUnit = await _orgUnitsService.AddOrgUnitAsync(orgUnitDTO, userId);

                return orgUnit;
            }
        }

        [HttpPost]
        [ModelStateFilter]
        [CompanyAdministrator]
        public async Task<OrgUnitResponseDTO> AddWarehouse([FromBody] OrgUnitRequestDTO orgUnitDTO)
        {
            using (var userManager = _userManagerFactory())
            {
                var userId = userManager.GetUserId(User);

                var orgUnit = await _orgUnitsService.AddWarehouseAsync(orgUnitDTO, userId);

                return orgUnit;
            }
        }

        [HttpPut]
        [ModelStateFilter]
        [CompanyAdministrator]
        public async Task<OrgUnitResponseDTO> Update([FromBody] OrgUnitRequestDTO orgUnitDTO)
        {
            return await _orgUnitsService.UpdateAsync(orgUnitDTO);
        }

        [HttpDelete]
        [ModelStateFilter]
        [CompanyAdministrator]
        public async Task Delete([FromQuery] OrgUnitDeleteRequest request)
        {
            await _orgUnitsService.DeleteAsync(request.OrgUnitId);
        }
    }
}
