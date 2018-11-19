using Api.Transports.AuthOtp;

namespace Api.Components.Otp
{
    public interface IOtpActivationRequestParamProvider
    {
        OtpActivationRequestParams Get(OtpActivationRequest credentials);
    }
}