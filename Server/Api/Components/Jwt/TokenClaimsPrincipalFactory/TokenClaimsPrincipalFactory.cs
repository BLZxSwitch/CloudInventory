using System;
using System.Security.Claims;
using Api.Components.Jwt.JwtSecurityTokenValidator;
using Api.Components.Jwt.TokenValidationParametersProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Jwt.TokenClaimsPrincipalFactory
{
    [As(typeof(ITokenClaimsPrincipalFactory))]
    internal class TokenClaimsPrincipalFactory : ITokenClaimsPrincipalFactory
    {
        private readonly IJwtSecurityTokenValidator _jwtSecurityTokenValidator;
        private readonly ITokenValidationParametersProvider _tokenValidationParametersProvider;

        public TokenClaimsPrincipalFactory(
            ITokenValidationParametersProvider tokenValidationParametersProvider,
            IJwtSecurityTokenValidator jwtSecurityTokenValidator)
        {
            _tokenValidationParametersProvider = tokenValidationParametersProvider;
            _jwtSecurityTokenValidator = jwtSecurityTokenValidator;
        }

        public ClaimsPrincipal Create(string jwtToken)
        {
            var parameters = _tokenValidationParametersProvider.GetParameters();
            try
            {
                return _jwtSecurityTokenValidator.Validate(jwtToken, parameters);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}