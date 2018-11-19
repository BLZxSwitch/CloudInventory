using System;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Components.CompanyNameIsTaken
{
    [As(typeof(ICompanyNameIsTakenProvider))]
    internal class CompanyNameIsTakenProvider : ICompanyNameIsTakenProvider
    {
        private readonly Func<IInventContext> _contextFactory;

        public CompanyNameIsTakenProvider(Func<IInventContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<bool> IsTaken(string companyName)
        {
            using (var context = _contextFactory())
            {
                return await context.Companies.AnyAsync(company => company.Name == companyName);
            }
        }
    }
}