using EF.Models.Enums;
using System;
using System.Collections.Generic;

namespace EF.Models.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid? SecurityUserId { get; set; }
        public Guid TenantId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PatronymicName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Phone { get; set; }
        public Gender Gender { get; set; }

        public string FullName => $"{FirstName} {LastName} {PatronymicName}";

        public virtual SecurityUser SecurityUser { get; set; }
        public virtual Company Company { get; set; }
        public virtual Tenant Tenant { get; set; }
        public virtual List<OrgUnitMOL> OrgUnitMOLs { get; set; } = new List<OrgUnitMOL>();
        public virtual List<OrgUnit> OrgUnits { get; set; } = new List<OrgUnit>();
    }
}
