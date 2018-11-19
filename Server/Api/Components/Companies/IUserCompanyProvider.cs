using EF.Models.Models;
using System;
using System.Threading.Tasks;

namespace Api.Providers.CompanyProviders
{
    public interface IUserCompanyProvider
    {
        Task<Company> GetAsync(Guid userId);
    }
}
