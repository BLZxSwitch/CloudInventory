using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Api.Components.Tenants
{
    [As(typeof(ITenantProvider))]
    public class TenantProvider : ITenantProvider
    {
        private readonly IInventContext _context;

        public TenantProvider(IInventContext context)
        {
            _context = context;
        }

        public async Task<Tenant> GetByIdAsync(Guid tenantId)
        {
                var Tenant = await _context.Tenants
                    .SingleOrDefaultAsync(e => e.Id == tenantId);

                return Tenant;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
