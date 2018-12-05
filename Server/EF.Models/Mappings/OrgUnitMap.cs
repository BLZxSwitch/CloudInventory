using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EF.Models.Mappings
{
    [As(typeof(IEntityTypeConfiguration<OrgUnit>))]
    public class OrgUnitMap : IEntityTypeConfiguration<OrgUnit>
    {
        public void Configure(EntityTypeBuilder<OrgUnit> builder)
        {
            builder.HasKey(entity => entity.Id);
            builder.Property(entity => entity.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasOne(entity => entity.CurrentOrgUnitMOL)
                .WithMany(employee => employee.OrgUnits)
                .HasForeignKey(entity => entity.CurrentOrgUnitMOLId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.HasOne(entity => entity.Company)
                .WithMany(company => company.OrgUnits)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(entity => entity.CompanyId);
            builder.HasOne(entity => entity.Tenant)
                .WithMany()
                .HasForeignKey(entity => entity.TenantId);
            builder.ToTable("OrgUnit", "md");
        }
    }
}