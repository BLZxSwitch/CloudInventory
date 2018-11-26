using System;
using EF.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EF.Models
{
    public class InventContext :
        IdentityDbContext<User, Role, Guid, IdentityUserClaim<Guid>, UserRole, IdentityUserLogin<Guid>,
            IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>, IScopedInventContext
    {
        private readonly IEntityTypeConfiguration<Company> _companyMap;
        private readonly IEntityTypeConfiguration<Employee> _employeeMap;
        private readonly IEntityTypeConfiguration<SecurityUser> _securityUserMap;
        private readonly IEntityTypeConfiguration<TenantSettings> _tenantSettings;
        private readonly IEntityTypeConfiguration<OrgUnit> _orgUnit;
        private readonly IEntityTypeConfiguration<OrgUnitMOL> _orgUnitMOL;
        private readonly IEntityTypeConfiguration<Tenant> _tenantMap;
        private readonly IEntityTypeConfiguration<User> _userMap;
        private readonly IEntityTypeConfiguration<UserRole> _userRoleMap;

        public InventContext(
            DbContextOptions<InventContext> options,
            IEntityTypeConfiguration<User> userMap,
            IEntityTypeConfiguration<UserRole> userRoleMap,
            IEntityTypeConfiguration<Company> companyMap,
            IEntityTypeConfiguration<Tenant> tenantMap,
            IEntityTypeConfiguration<Employee> employeeMap,
            IEntityTypeConfiguration<SecurityUser> securityUserMap,
            IEntityTypeConfiguration<TenantSettings> tenantSettings,
            IEntityTypeConfiguration<OrgUnit> orgUnit,
            IEntityTypeConfiguration<OrgUnitMOL> orgUnitMOL
            ) : base(options)
        {
            _userMap = userMap;
            _userRoleMap = userRoleMap;
            _companyMap = companyMap;
            _tenantMap = tenantMap;
            _employeeMap = employeeMap;
            _securityUserMap = securityUserMap;
            _tenantSettings = tenantSettings;
            _orgUnit = orgUnit;
            _orgUnitMOL = orgUnitMOL;
        }

        public virtual DbSet<Tenant> Tenants { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<SecurityUser> SecurityUsers { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<TenantSettings> TenantSettings { get; set; }
        public virtual DbSet<OrgUnit> OrgUnit { get; set; }
        public virtual DbSet<OrgUnitMOL> OrgUnitMOL { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(_userMap);
            builder.ApplyConfiguration(_userRoleMap);
            builder.ApplyConfiguration(_tenantMap);
            builder.ApplyConfiguration(_companyMap);
            builder.ApplyConfiguration(_employeeMap);
            builder.ApplyConfiguration(_securityUserMap);
            builder.ApplyConfiguration(_tenantSettings);
            builder.ApplyConfiguration(_orgUnit);
            builder.ApplyConfiguration(_orgUnitMOL);
        }
    }
}