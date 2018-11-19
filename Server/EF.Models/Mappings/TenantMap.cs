using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EF.Models.Mappings
{
    [As(typeof(IEntityTypeConfiguration<Tenant>))]
    class TenantMap : IEntityTypeConfiguration<Tenant>
    {
        public void Configure(EntityTypeBuilder<Tenant> builder)
        {
            builder.HasKey(entity => entity.Id);
            builder.Property(entity => entity.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasIndex(entity => entity.Name)
                .IsUnique();
            builder.Property(entity => entity.IsActive).HasColumnName("Active").IsRequired();
            builder.ToTable("Tenant", "sec");
        }
    }
}