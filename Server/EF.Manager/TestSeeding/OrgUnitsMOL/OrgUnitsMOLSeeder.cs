using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Manager.Components.JsonDataReader;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace EF.Manager.TestSeeding.OrgUnitsMOL
{
    [As(typeof(OrgUnitsMOLSeeder))]
    public class OrgUnitsMOLSeeder
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly ITestJsonDataReader<List<OrgUnitMOL>> _userJsonDataReader;

        public OrgUnitsMOLSeeder(
            Func<IInventContext> contextFactory,
            ITestJsonDataReader<List<OrgUnitMOL>> userJsonDataReader)
        {
            _contextFactory = contextFactory;
            _userJsonDataReader = userJsonDataReader;
        }

        public async Task Seed()
        {
            using (var context = _contextFactory())
            {
                var orgUnitsMOL = _userJsonDataReader.Read("OrgUnitsMOL/OrgUnitsMOL.json");
                foreach (var orgUnitMOL in orgUnitsMOL)
                {
                    if (await context.OrgUnit.AnyAsync(ou => ou.Id == orgUnitMOL.Id) == false)
                    {
                        context.OrgUnitMOL.Add(orgUnitMOL);
                    }
                }

                await context.SaveChangesAsync();
            }
        }
    }
}