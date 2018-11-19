using System.Threading.Tasks;
using Api.Transports.Common;

namespace Api.Components.Otp
{
    public interface IOtpDeactivationService
    {
        Task<UserSettingsDTO> DeactivateAsync(OtpActivationRequestParams credentials);
    }
}