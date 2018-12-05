using System;
using System.Threading;
using System.Threading.Tasks;
using EF.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace EF.Models
{
    public interface IInventContext : IDisposable
    {
        DbSet<Tenant> Tenants { get; set; }
        DbSet<TenantSettings> TenantSettings { get; set; }
        DbSet<Company> Companies { get; set; }
        DbSet<UserRole> UserRoles { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<IdentityRoleClaim<Guid>> RoleClaims { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<IdentityUserClaim<Guid>> UserClaims { get; set; }
        DbSet<IdentityUserLogin<Guid>> UserLogins { get; set; }
        DbSet<IdentityUserToken<Guid>> UserTokens { get; set; }
        DbSet<Employee> Employees { get; set; }
        DbSet<SecurityUser> SecurityUsers { get; set; }
        DbSet<OrgUnit> OrgUnits { get; set; }
        DbSet<OrgUnitMOL> OrgUnitMOLs { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
        Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken));
        EntityEntry<TEntity> Update<TEntity>(TEntity entity) where TEntity : class;
        EntityEntry<TEntity> Attach<TEntity>(TEntity entity) where TEntity : class;
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        EntityEntry<TEntity> Remove<TEntity>(TEntity entity) where TEntity : class;
    }
}