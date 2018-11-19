using Api.Components.Jwt.SymmetricSecurityKeyProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.TokenValidationParametersProvider
{
    [As(typeof(ITokenValidationParametersProvider))]
    internal class TokenValidationParametersProvider : ITokenValidationParametersProvider
    {
        private readonly JwtTokenOptions _options;
        private readonly ISymmetricSecurityKeyProvider _symmetricSecurityKeyProvider;

        public TokenValidationParametersProvider(
            IOptions<JwtTokenOptions> options,
            ISymmetricSecurityKeyProvider symmetricSecurityKeyProvider)
        {
            _symmetricSecurityKeyProvider = symmetricSecurityKeyProvider;
            _options = options.Value;
        }

        public TokenValidationParameters GetParameters()
        {
            var symmetricSecurityKey = _symmetricSecurityKeyProvider.GetKey();
            return new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _options.Issuer,
                ValidAudience = _options.Issuer,
                IssuerSigningKey = symmetricSecurityKey
            };
        }
    }
}