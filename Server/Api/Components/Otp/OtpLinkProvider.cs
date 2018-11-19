using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.Extensions.Options;

namespace Api.Components.Otp
{
    [As(typeof(IOtpLinkProvider))]
    class OtpLinkProvider : IOtpLinkProvider
    {
        private readonly AuthOtpOptions _options;

        public OtpLinkProvider(IOptions<AuthOtpOptions> options)
        {
            _options = options.Value;
        }

        public string Get(OtpLinkRequest request, string secretKey)
        {
            var issuer = request.IssuerName;
            var email = request.UserEmail;
            var digits = _options.Digits;

            return $"otpauth://totp/{issuer}:{email}?secret={secretKey}&issuer={issuer}&digits={digits}";
        }
    }
}