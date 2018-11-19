using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Providers.CompanyProviders
{
    [As(typeof(IUserCompanyProvider))]
    public class UserCompanyProvider : IUserCompanyProvider
    {
        private readonly Func<IInventContext> _contextFactory;

        public UserCompanyProvider(Func<IInventContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<Company> GetAsync(Guid userId)
        {
            using (var context = _contextFactory())
            {
                return await context.Companies.SingleAsync(
                    company => company.Employees.Any(employee => employee.SecurityUser.UserId == userId));
            }
        }
    }
}
