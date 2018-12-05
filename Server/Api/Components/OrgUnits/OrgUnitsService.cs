using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using Api.Common.Exceptions;
using Api.Providers.CompanyProviders;
using Api.Transports.OrgUnits;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using EF.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Components.OrgUnits
{
    [As(typeof(IOrgUnitsService))]
    internal class OrgUnitsService : IOrgUnitsService
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly IMapper _mapper;
        private readonly IUserCompanyProvider _userCompanyProvider;
        private readonly IDbSetProxyProvider _dbSetProxyProvider;
        private readonly IOrgUnitProvider _orgUnitProvider;

        public OrgUnitsService(Func<IInventContext> contextFactory,
            IMapper mapper,
            IUserCompanyProvider userCompanyProvider,
            IDbSetProxyProvider dbSetProxyProvider,
            IOrgUnitProvider orgUnitProvider)
        {
            _contextFactory = contextFactory;
            _mapper = mapper;
            _userCompanyProvider = userCompanyProvider;
            _dbSetProxyProvider = dbSetProxyProvider;
            _orgUnitProvider = orgUnitProvider;
        }

        public async Task<IEnumerable<OrgUnitResponseDTO>> GetAllAsync(Guid tenantId)
        {
            using (var context = _contextFactory())
            {
                return await context.OrgUnits
                    .Where(orgUnit => orgUnit.TenantId == tenantId)
                    .ProjectTo<OrgUnitResponseDTO>()
                    .ToListAsync();
            }
        }

        public async Task<OrgUnitResponseDTO> AddOrgUnitAsync(OrgUnitDTO orgUnitDTO, Guid userId)
        {
            using (var context = _contextFactory())
            {
                var company = await _userCompanyProvider.GetAsync(userId);

                var orgUnit = _mapper.Map(orgUnitDTO, _dbSetProxyProvider.Create(context.OrgUnits));

                orgUnit.TenantId = company.TenantId;
                orgUnit.CompanyId = company.Id;

                context.OrgUnits.Add(orgUnit);

                await context.SaveChangesAsync();

                return _mapper.Map<OrgUnitResponseDTO>(orgUnit);
            }
        }

        public async Task<OrgUnitResponseDTO> AddWarehouseAsync(OrgUnitDTO orgUnitDTO, Guid userId)
        {
            using (var context = _contextFactory())
            {
                var company = await _userCompanyProvider.GetAsync(userId);

                var orgUnit = _mapper.Map(orgUnitDTO, _dbSetProxyProvider.Create(context.OrgUnits));

                orgUnit.TenantId = company.TenantId;
                orgUnit.CompanyId = company.Id;
                orgUnit.IsWarehouse = true;

                context.OrgUnits.Add(orgUnit);

                await context.SaveChangesAsync();

                return _mapper.Map<OrgUnitResponseDTO>(orgUnit);
            }
        }

        public async Task<OrgUnitResponseDTO> UpdateAsync(OrgUnitDTO orgUnitDTO)
        {
            using (var context = _contextFactory())
            {
                var orgUnit = await _orgUnitProvider.GetByIdAsync(orgUnitDTO.Id);

                _mapper.Map(orgUnitDTO, orgUnit);

                context.Update(orgUnit);

                await context.SaveChangesAsync();

                return _mapper.Map<OrgUnitResponseDTO>(orgUnit);
            }
        }

        public async Task DeleteAsync(Guid orgUnitId)
        {
            using (var context = _contextFactory())
            {
                var orgUnit = await _orgUnitProvider.GetByIdAsync(orgUnitId);
                if (!orgUnit.OrgUnitMOLs.Any())
                {
                    context.OrgUnits.Remove(orgUnit);
                    await context.SaveChangesAsync();
                }
                else
                {
                    throw new BadRequestException("ORG_UNIT_HAS_MOLS_DELETE_FAILED");
                }
            }
        }
    }
}
