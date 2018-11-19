using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EF.Models.Mappings
{
    [As(typeof(IEntityTypeConfiguration<TenantSettings>))]
    class TenantSettingsMap : IEntityTypeConfiguration<TenantSettings>
    {
        public void Configure(EntityTypeBuilder<TenantSettings> builder)
        {
            builder.HasKey(entity => entity.Id);
            builder.Property(enitty => enitty.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasOne(entity => entity.Tenant)
                .WithOne(tenant => tenant.TenantSettings)
                .HasForeignKey<TenantSettings>(entity => entity.TenantId)
                .IsRequired();
            builder.ToTable("TenantSettings", "sec");
        }
    }
}