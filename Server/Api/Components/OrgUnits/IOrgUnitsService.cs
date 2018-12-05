using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Transports.OrgUnits;

namespace Api.Components.OrgUnits
{
    public interface IOrgUnitsService
    {
        Task<IEnumerable<OrgUnitResponseDTO>> GetAllAsync(Guid userId);
        Task<OrgUnitResponseDTO> AddOrgUnitAsync(OrgUnitDTO orgUnitDTO, Guid userId);
        Task<OrgUnitResponseDTO> AddWarehouseAsync(OrgUnitDTO orgUnitDTO, Guid userId);
        Task<OrgUnitResponseDTO> UpdateAsync(OrgUnitDTO orgUnitDTO);
        Task DeleteAsync(Guid orgUnitId);
    }
}
