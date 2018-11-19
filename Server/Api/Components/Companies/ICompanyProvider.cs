using EF.Models.Models;
using System;
using System.Threading.Tasks;

namespace Api.Providers.CompanyProviders
{
    public interface ICompanyProvider
    {
        Task<Company> GetByTenantIdAsync(Guid tenantId);
    }
}
