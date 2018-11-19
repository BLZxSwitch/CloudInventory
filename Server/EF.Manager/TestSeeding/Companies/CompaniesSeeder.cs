using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Manager.Components.JsonDataReader;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace EF.Manager.TestSeeding.Companies
{
    [As(typeof(CompaniesSeeder))]
    public class CompaniesSeeder
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly ITestJsonDataReader<List<Company>> _userJsonDataReader;

        public CompaniesSeeder(
            Func<IInventContext> contextFactory,
            ITestJsonDataReader<List<Company>> userJsonDataReader)
        {
            _contextFactory = contextFactory;
            _userJsonDataReader = userJsonDataReader;
        }

        public async Task Seed()
        {
            using (var context = _contextFactory())
            {
                var companies = _userJsonDataReader.Read("companies/companies.json");
                foreach (var company in companies)
                {
                    if (await context.Companies.AnyAsync(c => c.Id == company.Id) == false)
                    {
                        context.Companies.Add(company);
                    }
                }

                await context.SaveChangesAsync();
            }
        }
    }
}