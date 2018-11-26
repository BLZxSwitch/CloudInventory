using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EF.Models.Mappings
{
    [As(typeof(IEntityTypeConfiguration<OrgUnitMOL>))]
    public class OrgUnitMOLMap : IEntityTypeConfiguration<OrgUnitMOL>
    {
        public void Configure(EntityTypeBuilder<OrgUnitMOL> builder)
        {
            builder.HasKey(entity => entity.Id);
            builder.Property(entity => entity.Id).HasDefaultValueSql("newsequentialid()");
            builder.ToTable("OrgUnitMOL", "md");
            builder.HasOne(entity => entity.Employee)
                .WithMany(orgUnits => orgUnits.OrgUnitMOLs)
                .HasForeignKey(entity => entity.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.HasOne(entity => entity.OrgUnit)
                .WithMany(orgUnit => orgUnit.OrgUnitMOLs)
                .HasForeignKey(enity => enity.OrgUnitId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}