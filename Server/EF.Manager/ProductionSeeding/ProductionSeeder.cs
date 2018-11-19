using System;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace EF.Manager.ProductionSeeding
{
    [As(typeof(ProductionSeeder))]
    public class ProductionSeeder
    {
        private readonly Func<IInventContext> _contextFactory;

        public ProductionSeeder(
            Func<IInventContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task Seed()
        {
            using (var context = _contextFactory())
            {
                if (await context.Roles.AnyAsync() == false)
                {
                    await context.Roles.AddRangeAsync(
                        new Role
                        {
                            Id = UserRoles.CompanyAdministrator.RoleId,
                            Name = UserRoles.CompanyAdministrator.Name
                        }, new Role
                        {
                            Id = UserRoles.Employee.RoleId,
                            Name = UserRoles.Employee.Name
                        });

                    await context.SaveChangesAsync();
                }
            }
        }
    }
}