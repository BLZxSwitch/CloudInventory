using System;
using System.Collections.Generic;

namespace EF.Models.Models
{
    public class OrgUnit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CurrentOrgUnitMOLId { get; set; }
        public bool IsWarehouse { get; set; }

        public virtual Employee CurrentOrgUnitMOL { get; set; }
        public virtual List<OrgUnitMOL> OrgUnitMOLs { get; set; } = new List<OrgUnitMOL>();
    }
}
