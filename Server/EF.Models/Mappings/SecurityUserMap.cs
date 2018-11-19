using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EF.Models.Mappings
{
    [As(typeof(IEntityTypeConfiguration<SecurityUser>))]
    internal class SecurityUserMap : IEntityTypeConfiguration<SecurityUser>
    {
        public void Configure(EntityTypeBuilder<SecurityUser> builder)
        {
            builder.HasKey(entity => entity.Id);
            builder.Property(entity => entity.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasOne(entity => entity.User)
                .WithOne(entity => entity.SecurityUser)
                .HasForeignKey<SecurityUser>(entity => entity.UserId);
            builder.HasOne(entity => entity.Tenant)
                .WithMany()
                .HasForeignKey(entity => entity.TenantId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Property(entity => entity.IsActive)
                .HasDefaultValue(true)
                .ValueGeneratedNever()
                .IsRequired();
            builder.Property(entity => entity.CultureName)
                .IsRequired()
                .HasDefaultValue("ru");
            builder.ToTable("User", "sec");
        }
    }
}