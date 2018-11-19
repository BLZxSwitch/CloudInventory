using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace EF.Models.Models
{
    public class User : IdentityUser<Guid>
    {
        public bool IsCompanyAdministrator => Roles.Any(r => r.RoleId == UserRoles.CompanyAdministrator.RoleId);

        public virtual SecurityUser SecurityUser { get; set; }

        public virtual ICollection<UserRole> Roles { get; set; }
    }
}