using Api.Transports.AuthOtp;

namespace Api.Components.Otp
{
    public interface IOtpResponseProvider
    {
        OtpGetLinkResponse Get(OtpLinkRequest request);
    }
}