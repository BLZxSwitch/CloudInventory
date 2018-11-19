using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System.Linq;
using System.Security.Claims;

namespace Api.Components.Otp
{
    [As(typeof(IOtpSecretKeyClaimValueProvider))]
    class OtpSecretKeyClaimValueProvider : IOtpSecretKeyClaimValueProvider
    {
        private readonly ClaimsPrincipal _principal;

        public OtpSecretKeyClaimValueProvider(ClaimsPrincipal principal)
        {
            _principal = principal;
        }

        public string GetValue()
        {
            var userIdClaim = _principal.Claims
                .Single(claim => claim.Type == ProjectClaims.OtpTokenSecretKeyClaimName);

            return userIdClaim.Value;
        }
    }
}