using System.Linq;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;

namespace Api.Components.Roles
{
    [As(typeof(IRolesService))]
    public class RolesService : IRolesService
    {
        private readonly IInventContext _context;

        public RolesService(IInventContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task SetIsAdminStateAsync(User user, bool isAdmin)
        {
            if (isAdmin)
            {
                if (!user.IsCompanyAdministrator)
                {
                    _context.UserRoles.Add(new UserRole
                    {
                        RoleId = UserRoles.CompanyAdministrator.RoleId,
                        UserId = user.Id
                    });

                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                if (user.IsCompanyAdministrator)
                {
                    var userRole = user.Roles.First(role => role.RoleId == UserRoles.CompanyAdministrator.RoleId);

                    _context.UserRoles.Remove(userRole);

                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}