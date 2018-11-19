using EF.Models.Models;
using System.Threading.Tasks;

namespace Api.Components.CompanyRegister
{
    public interface ICompanyRegisterInternalEmailNotificationService
    {
        Task SendAsync(User user);
    }
}