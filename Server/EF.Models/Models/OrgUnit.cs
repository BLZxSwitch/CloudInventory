using System;
using System.Collections.Generic;

namespace EF.Models.Models
{
    public class OrgUnit
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CurrentOrgUnitMOLId { get; set; }
        public bool IsWarehouse { get; set; } = false;
        public Guid CompanyId { get; set; }
        public Guid TenantId { get; set; }

        public virtual Company Company { get; set; }
        public virtual Tenant Tenant { get; set; }
        public virtual Employee CurrentOrgUnitMOL { get; set; }
        public virtual List<OrgUnitMOL> OrgUnitMOLs { get; set; } = new List<OrgUnitMOL>();
    }
}
