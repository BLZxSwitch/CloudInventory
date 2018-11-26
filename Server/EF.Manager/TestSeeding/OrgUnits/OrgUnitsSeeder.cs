using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Manager.Components.JsonDataReader;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace EF.Manager.TestSeeding.OrgUnits
{
    [As(typeof(OrgUnitsSeeder))]
    public class OrgUnitsSeeder
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly ITestJsonDataReader<List<OrgUnit>> _userJsonDataReader;

        public OrgUnitsSeeder(
            Func<IInventContext> contextFactory,
            ITestJsonDataReader<List<OrgUnit>> userJsonDataReader)
        {
            _contextFactory = contextFactory;
            _userJsonDataReader = userJsonDataReader;
        }

        public async Task Seed()
        {
            using (var context = _contextFactory())
            {
                var orgUnits = _userJsonDataReader.Read("OrgUnits/OrgUnits.json");
                foreach (var orgUnit in orgUnits)
                {
                    if (await context.OrgUnit.AnyAsync(ou => ou.Id == orgUnit.Id) == false)
                    {
                        context.OrgUnit.Add(orgUnit);
                    }
                }

                await context.SaveChangesAsync();
            }
        }
    }
}