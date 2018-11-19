using System;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Otp
{
    [As(typeof(IOtpSignInValidationService))]
    public class OtpSignInValidationService : IOtpSignInValidationService
    {
        private readonly IOtpCodeValidationService _otpCodeValidationService;
        private readonly IOtpSecretKeyProvider _otpSecretKeyProvider;

        public OtpSignInValidationService(IOtpCodeValidationService otpCodeValidationService,
            IOtpSecretKeyProvider otpSecretKeyProvider)
        {
            _otpCodeValidationService = otpCodeValidationService;
            _otpSecretKeyProvider = otpSecretKeyProvider;
        }
        public async Task<bool> Validate(Guid userId, int credentialsCode)
        {
            return _otpCodeValidationService.Validate(await _otpSecretKeyProvider.ReadAsync(userId), credentialsCode);
        }
    }
}