using EF.Models.Models;
using System.Threading.Tasks;

namespace Api.Components.ResetPassword
{
    public interface IResetPasswordService
    {
        Task SendPasswordResetTokenAsync(User user);
    }
}
