using System.Threading.Tasks;

namespace Api.Components.Captcha
{
    public interface ICaptchaValidationService
    {
        Task<bool> IsValidAsync(string validationToken);
    }
}