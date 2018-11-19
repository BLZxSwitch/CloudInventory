using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Api.Providers.CompanyProviders
{
    [As(typeof(ICompanyProvider))]
    public class CompanyProvider : ICompanyProvider
    {
        private readonly Func<IInventContext> _contextFactory;

        public CompanyProvider(Func<IInventContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<Company> GetByTenantIdAsync(Guid tenantId)
        {
            using (var context = _contextFactory())
            {
                return await context.Companies.SingleAsync(company => company.TenantId == tenantId);
            }
        }
    }
}
