using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.JwtSecurityTokenValidator
{
    public interface IJwtSecurityTokenValidator
    {
        ClaimsPrincipal Validate(string jwtToken, TokenValidationParameters parameters);
    }
}