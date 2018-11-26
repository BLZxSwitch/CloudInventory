using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EF.Models.Mappings
{
    [As(typeof(IEntityTypeConfiguration<Employee>))]
    class EmployeeMap : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(entity => entity.Id);
            builder.Property(entity => entity.Id).HasDefaultValueSql("newsequentialid()");
            builder.HasOne(entity => entity.SecurityUser)
                .WithOne(entity => entity.Employee)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<Employee>(entity => entity.SecurityUserId)
                .IsRequired(false);
            builder.HasOne(entity => entity.Company)
                .WithMany(entity => entity.Employees)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(entity => entity.CompanyId);
            builder.HasOne(entity => entity.Tenant)
                .WithMany()
                .HasForeignKey(entity => entity.TenantId);
            builder.HasMany(entity => entity.OrgUnits)
                .WithOne(orgUnits => orgUnits.CurrentOrgUnitMOL)
                .HasForeignKey(entity => entity.CurrentOrgUnitMOLId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.HasMany(entity => entity.OrgUnitMOLs)
                .WithOne(orgUnits => orgUnits.Employee)
                .HasForeignKey(entity => entity.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
            builder.HasMany(entity => entity.OrgUnits)
                .WithOne(orgUnits => orgUnits.CurrentOrgUnitMOL)
                .HasForeignKey(entity => entity.CurrentOrgUnitMOLId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.Property(entity => entity.FirstName).IsRequired();
            builder.Property(entity => entity.LastName).IsRequired();
            builder.ToTable("Employee", "md");
        }
    }
}