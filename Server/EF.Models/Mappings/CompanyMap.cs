using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EF.Models.Mappings
{
    [As(typeof(IEntityTypeConfiguration<Company>))]
    class CompanyMap : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasKey(entity => entity.Id);
            builder.Property(entity => entity.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasOne(entity => entity.Tenant)
                .WithOne(tenant => tenant.Company)
                .HasForeignKey<Company>(entity => entity.TenantId)
                .IsRequired();
            builder.Property(entity => entity.Name)
                .IsRequired();
            builder.Property(entity => entity.Phone)
                .HasDefaultValue(0)
                .IsRequired();
            builder.HasIndex(entity => entity.Name)
                .IsUnique();
            builder.ToTable("Company", "md");
        }
    }
}