using System.Linq;
using System.Security.Claims;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Jwt.TokenTTLClaimValueProvider
{
    [As(typeof(ITokenTTLClaimValueProvider))]
    internal class TokenTtlClaimValueProvider : ITokenTTLClaimValueProvider
    {
        private readonly ClaimsPrincipal _principal;

        public TokenTtlClaimValueProvider(ClaimsPrincipal principal)
        {
            _principal = principal;
        }

        public bool HasLongTimeToLive()
        {
            var hasLongTimeToLiveClaim = _principal.Claims
                .Single(claim => claim.Type == ProjectClaims.JwtTokenHasLongTimeToLiveClaimName);

            return bool.Parse(hasLongTimeToLiveClaim.Value);
        }
    }
}