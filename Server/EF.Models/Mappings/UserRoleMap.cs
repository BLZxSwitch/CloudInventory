using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EF.Models.Mappings
{
    [As(typeof(IEntityTypeConfiguration<UserRole>))]
    class UserRoleMap : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.HasKey(entity => new { entity.UserId, entity.RoleId});
            builder.HasOne(entity => entity.User).WithMany(user => user.Roles).HasForeignKey(entity => entity.UserId);
            builder.HasOne(entity => entity.Role).WithMany(role => role.Users).HasForeignKey(entity => entity.RoleId);
            builder.Property(entity => entity.UserId).HasColumnName("UserId");
            builder.Property(entity => entity.RoleId).HasColumnName("RoleId");
        }
    }
}