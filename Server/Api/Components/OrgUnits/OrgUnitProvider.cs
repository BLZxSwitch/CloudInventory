using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Api.Components.OrgUnits
{
    [As(typeof(IOrgUnitProvider))]
    public class OrgUnitProvider : IOrgUnitProvider
    {
        private readonly IInventContext _InventContext;

        public OrgUnitProvider(IInventContext InventContext)
        {
            _InventContext = InventContext;
        }

        public void Dispose()
        {
            _InventContext.Dispose();
        }

        public async Task<OrgUnit> GetByIdAsync(Guid orgUnitId)
        {
            var orgUnit = await _InventContext.OrgUnits
                .SingleOrDefaultAsync(e => e.Id == orgUnitId);

            return orgUnit;
        }
    }
}
