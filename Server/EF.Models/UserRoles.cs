using System;

namespace EF.Models
{
    public static class UserRoles
    {
        public class Role
        {
            public string Name { get; }
            public Guid RoleId { get; }

            public Role(Guid roleId, string name)
            {
                RoleId = roleId;
                Name = name;
            }
        }

        public static readonly Role CompanyAdministrator = new Role(new Guid("{f9b496fe-e799-4b84-a2af-00a2268d2897}"), "CompanyAdministrator");
        public static readonly Role Employee = new Role(new Guid("{d1313132-e715-4834-be31-9d85bf3aec11}"), "Employee");
    }
}