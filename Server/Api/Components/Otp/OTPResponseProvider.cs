using Api.Transports.AuthOtp;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Otp
{
    [As(typeof(IOtpResponseProvider))]
    class OtpResponseProvider : IOtpResponseProvider
    {
        private readonly IOtpTokenProvider _otpTokenProvider;
        private readonly IOtpSecretKeyProvider _otpSecretKeyProvider;
        private readonly IOtpLinkProvider _otpLinkProvider;

        public OtpResponseProvider(
            IOtpTokenProvider otpTokenProvider,
            IOtpSecretKeyProvider otpSecretKeyProvider,
            IOtpLinkProvider otpLinkProvider)
        {
            _otpTokenProvider = otpTokenProvider;
            _otpSecretKeyProvider = otpSecretKeyProvider;
            _otpLinkProvider = otpLinkProvider;
        }

        public OtpGetLinkResponse Get(OtpLinkRequest request)
        {
            var secretKey = _otpSecretKeyProvider.Get();
            return new OtpGetLinkResponse
            {
                OtpLink = _otpLinkProvider.Get(request, secretKey),
                OtpToken = _otpTokenProvider.Get(request.UserId, secretKey),
                SecretKey = secretKey
            };
        }
    }
}
