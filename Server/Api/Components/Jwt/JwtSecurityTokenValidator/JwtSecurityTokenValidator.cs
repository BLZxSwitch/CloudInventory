using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.JwtSecurityTokenValidator
{
    [As(typeof(IJwtSecurityTokenValidator))]
    internal class JwtSecurityTokenValidator : IJwtSecurityTokenValidator
    {
        public ClaimsPrincipal Validate(string jwtToken, TokenValidationParameters parameters)
        {
            var validator = new JwtSecurityTokenHandler();
            return validator.ValidateToken(jwtToken, parameters, out _);
        }
    }
}