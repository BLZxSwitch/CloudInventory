using System;
using System.Collections.Generic;

namespace EF.Models.Models
{
    public class Company
    {
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string INN { get; set; }

        public virtual Tenant Tenant { get; set; }
        public virtual List<Employee> Employees { get; set; } = new List<Employee>();
        public virtual List<OrgUnit> OrgUnits { get; set; } = new List<OrgUnit>();
    }
}