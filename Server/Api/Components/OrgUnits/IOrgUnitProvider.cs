using EF.Models.Models;
using System;
using System.Threading.Tasks;

namespace Api.Components.OrgUnits
{
    public interface IOrgUnitProvider : IDisposable
    {
        Task<OrgUnit> GetByIdAsync(Guid orgUnitId);
    }
}
