using Api.Components.Factories;
using Api.Components.Jwt.TokenClaimsPrincipalFactory;
using Api.Components.Jwt.UserIdClaimValueProvider;
using Api.Transports.AuthOtp;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using SecurityDriven.Inferno.Extensions;
using System.Security.Claims;

namespace Api.Components.Otp
{
    [As(typeof(IOtpActivationRequestParamProvider))]
    class OtpActivationRequestParamProvider : IOtpActivationRequestParamProvider
    {
        private readonly IFactory<ClaimsPrincipal, IUserIdClaimValueProvider> _userIdClaimValueProviderFactory;
        private readonly IFactory<ClaimsPrincipal, IOtpSecretKeyClaimValueProvider> _otpSecretKeyClaimValueProvider;
        private readonly ITokenClaimsPrincipalFactory _tokenClaimsPrincipalFactory;

        public OtpActivationRequestParamProvider(
            IFactory<ClaimsPrincipal, IUserIdClaimValueProvider> userIdClaimValueProviderFactory,
            IFactory<ClaimsPrincipal, IOtpSecretKeyClaimValueProvider> otpSecretKeyClaimValueProvider,
            ITokenClaimsPrincipalFactory tokenClaimsPrincipalFactory)
        {
            _userIdClaimValueProviderFactory = userIdClaimValueProviderFactory;
            _otpSecretKeyClaimValueProvider = otpSecretKeyClaimValueProvider;
            _tokenClaimsPrincipalFactory = tokenClaimsPrincipalFactory;
        }

        public OtpActivationRequestParams Get(OtpActivationRequest credentials)
        {
            var claimsPrincipal = _tokenClaimsPrincipalFactory.Create(credentials.OtpToken);
            if (claimsPrincipal == null) return null;

            var userIdClaimValueProvider = _userIdClaimValueProviderFactory.Create(claimsPrincipal);
            var otpSecretKeyClaimValueProvider = _otpSecretKeyClaimValueProvider.Create(claimsPrincipal);

            var userId = userIdClaimValueProvider.GetValue();
            var secretKey = otpSecretKeyClaimValueProvider.GetValue();
            var secretKeyBytes = secretKey.FromBase32(config: Base32Config.Rfc);

            return new OtpActivationRequestParams {
                UserId = userId,
                SecretKey = secretKeyBytes,
                Otp = credentials.Otp,
                Password = credentials.Password
            };
        }
    }
}