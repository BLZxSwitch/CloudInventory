using System.Security.Claims;
using Api.Components.Factories;
using Api.Components.Jwt.CreateJwtTokenAsStringService;
using Api.Components.Jwt.RolesClaimValueProvider;
using Api.Components.Jwt.TokenClaimsPrincipalFactory;
using Api.Components.Jwt.TokenTTLClaimValueProvider;
using Api.Components.Jwt.UserIdClaimValueProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Jwt.RenewAccessTokenService
{
    [As(typeof(IRenewAccessTokenService))]
    internal class RenewAccessTokenService : IRenewAccessTokenService
    {
        private readonly ICreateJwtTokenAsStringService _createJwtTokenAsStringService;
        private readonly ITokenClaimsPrincipalFactory _tokenClaimsPrincipalFactory;
        private readonly IFactory<ClaimsPrincipal, ITokenTTLClaimValueProvider> _tokenTtlClaimValueProviderFactory;
        private readonly IFactory<ClaimsPrincipal, IUserIdClaimValueProvider> _userIdClaimValueProviderFactory;
        private readonly IFactory<ClaimsPrincipal, IRolesClaimValueProvider> _rolesClaimValueProviderFactory;

        public RenewAccessTokenService(
            IFactory<ClaimsPrincipal, IUserIdClaimValueProvider> userIdClaimValueProviderFactory,
            IFactory<ClaimsPrincipal, ITokenTTLClaimValueProvider> tokenTTLClaimValueProviderFactory,
            IFactory<ClaimsPrincipal, IRolesClaimValueProvider> rolesClaimValueProviderFactory,
            ITokenClaimsPrincipalFactory tokenClaimsPrincipalFactory,
            ICreateJwtTokenAsStringService createJwtTokenAsStringService)
        {
            _userIdClaimValueProviderFactory = userIdClaimValueProviderFactory;
            _tokenTtlClaimValueProviderFactory = tokenTTLClaimValueProviderFactory;
            _tokenClaimsPrincipalFactory = tokenClaimsPrincipalFactory;
            _createJwtTokenAsStringService = createJwtTokenAsStringService;
            _rolesClaimValueProviderFactory = rolesClaimValueProviderFactory;
        }

        public string Renew(string outdatedToken)
        {
            if (string.IsNullOrEmpty(outdatedToken)) return null;

            var claimsPrincipal = _tokenClaimsPrincipalFactory.Create(outdatedToken);

            if (claimsPrincipal == null) return null;

            var userIdClaimValueProvider = _userIdClaimValueProviderFactory.Create(claimsPrincipal);
            var tokenTtlClaimValueProvider = _tokenTtlClaimValueProviderFactory.Create(claimsPrincipal);
            var rolesClaimValueProvider = _rolesClaimValueProviderFactory.Create(claimsPrincipal);

            var userId = userIdClaimValueProvider.GetValue();
            var hasLongTimeToLive = tokenTtlClaimValueProvider.HasLongTimeToLive();
            var roles = rolesClaimValueProvider.GetValue();

            return _createJwtTokenAsStringService.Create(userId, hasLongTimeToLive, roles);
        }
    }
}