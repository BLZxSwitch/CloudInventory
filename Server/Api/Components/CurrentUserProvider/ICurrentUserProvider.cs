using System.Security.Claims;
using System.Threading.Tasks;
using EF.Models.Models;

namespace Api.Components.CurrentUserProvider
{
    public interface ICurrentUserProvider
    {
        Task<User> GetUserAsync(ClaimsPrincipal principal);
    }
}