using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using SecurityDriven.Inferno.Otp;

namespace Api.Components.Otp
{
    [As(typeof(IOtpCodeValidationService))]
    class OtpCodeValidationService : IOtpCodeValidationService
    {
        public bool Validate(byte[] secretKey, int code)
        {
            return TOTP.ValidateTOTP(secretKey, code);
        }
    }
}