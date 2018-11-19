using EF.Models.Models;
using System.Threading.Tasks;

namespace Api.Components.InviteUser
{
    public interface IInviteUserService
    {
        Task SendPasswordResetTokenAsync(User user);
    }
}
