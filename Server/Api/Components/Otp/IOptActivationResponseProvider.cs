using Api.Transports.Common;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    public interface IOtpActivationService
    {
        Task<UserSettingsDTO> ActivateAsync(OtpActivationRequestParams credentials);
    }
}