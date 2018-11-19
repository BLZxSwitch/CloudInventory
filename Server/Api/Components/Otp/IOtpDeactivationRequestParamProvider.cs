using System.Threading.Tasks;
using Api.Controllers;
using Api.Transports.AuthOtp;

namespace Api.Components.Otp
{
    public interface IOtpDeactivationRequestParamProvider
    {
        Task<OtpActivationRequestParams> GetAsync(OtpDeactivationRequest credentials);
    }
}