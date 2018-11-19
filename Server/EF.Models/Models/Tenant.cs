using System;

namespace EF.Models.Models
{
    public class Tenant
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; } = true;
        public string Name { get; set; }
        public virtual Company Company { get; set; }
        public virtual TenantSettings TenantSettings { get; set; }
    }
}