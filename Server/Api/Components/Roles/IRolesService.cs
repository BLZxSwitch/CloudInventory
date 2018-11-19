using EF.Models.Models;
using System;
using System.Threading.Tasks;

namespace Api.Components.Roles
{
    public interface IRolesService : IDisposable
    {
        Task SetIsAdminStateAsync(User user, bool isAdmin);
    }
}
