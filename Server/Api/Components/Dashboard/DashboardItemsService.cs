using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Components.Dashboard
{
    [As(typeof(IDashboardItemsService))]
    public class DashboardItemsService : IDashboardItemsService
    {
        private readonly Func<IInventContext> _contextFactory;

        public DashboardItemsService(Func<IInventContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<bool> HasOnlyAdminUsers(Guid tenantId)
        {
            using (var context = _contextFactory())
            {
                var tenantUsers = await context.Employees
                    .Where(entity => entity.TenantId == tenantId)
                    .ToListAsync();

                return tenantUsers
                    .All(employee => employee.SecurityUser.User.IsCompanyAdministrator);
            }
        }
    }
}
