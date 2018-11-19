using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Components.Dashboard
{
    public interface IDashboardItemsService
    {
        Task<bool> HasOnlyAdminUsers(Guid tenantId);
    }
}