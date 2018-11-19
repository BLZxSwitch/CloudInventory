using System;

namespace EF.Models.Models
{
    public class TenantSettings
    {
        public Guid Id { get; set; }

        public Guid TenantId { get; set; }

        public virtual Tenant Tenant { get; set; }
    }
}
