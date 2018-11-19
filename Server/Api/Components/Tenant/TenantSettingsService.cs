using Api.Transports.Tenant;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Components.Tenants
{
    [As(typeof(ITenantSettingsService))]
    public class TenantSettingsService : ITenantSettingsService
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly IMapper _mapper;

        public TenantSettingsService(
            IMapper mapper,
            Func<IInventContext> contextFactory)
        {
            _contextFactory = contextFactory;
            _mapper = mapper;
        }

        public async Task<TenantSettingsDTO> GetByTenantIdAsync(Guid tenantId)
        {
            using (var context = _contextFactory())
            {
                return await context.TenantSettings
                            .Where(e => e.TenantId == tenantId)
                            .ProjectTo<TenantSettingsDTO>()
                            .SingleOrDefaultAsync();
            }
        }

        public async Task<TenantSettingsDTO> UpdateAsync(TenantSettingsDTO tenantSettingsDTO, Guid tenantId)
        {
            using (var context = _contextFactory())
            {
                var tenantSettings = await context.TenantSettings
                    .SingleOrDefaultAsync(e => e.TenantId == tenantId);

                if (tenantSettings == null)
                {
                    tenantSettings = _mapper.Map<TenantSettings>(tenantSettingsDTO);
                    tenantSettings.TenantId = tenantId;
                    context.TenantSettings.Add(tenantSettings);
                }
                else
                {
                    tenantSettings = _mapper.Map(tenantSettingsDTO, tenantSettings);
                    context.Update(tenantSettings);
                }

                await context.SaveChangesAsync();

                return _mapper.Map<TenantSettingsDTO>(tenantSettings);
            }
        }
    }
}
