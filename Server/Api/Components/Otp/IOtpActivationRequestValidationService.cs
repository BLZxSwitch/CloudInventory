using System.Threading.Tasks;

namespace Api.Components.Otp
{
    public interface IOtpActivationRequestValidationService
    {
        Task<string> ValidateAsync(OtpActivationRequestParams activationRequest);
    }
}