using EF.Models.Models;
using System.Threading.Tasks;

namespace Api.Components.CompanyRegister
{
    public interface ICompanyRegisterEmailNotificationService
    {
        Task SendAsync(User user);
    }
}