using System.Security.Claims;

namespace Api.Components.Jwt.TokenClaimsPrincipalFactory
{
    public interface ITokenClaimsPrincipalFactory
    {
        ClaimsPrincipal Create(string jwtToken);
    }
}