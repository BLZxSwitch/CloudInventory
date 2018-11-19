using EF.Models.Models;
using System.Threading.Tasks;

namespace Api.Components.SetPasswordEmail
{
    public interface ISetPasswordEmailService
    {
        Task GenerateAndSendTokenAsync(User user, string token, string clientUrl, string subject, string body);
    }
}
