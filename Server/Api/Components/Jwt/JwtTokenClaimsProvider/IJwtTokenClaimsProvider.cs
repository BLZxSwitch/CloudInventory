using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Api.Components.Jwt.JwtTokenClaimsProvider
{
    public interface IJwtTokenClaimsProvider
    {
        List<Claim> GetClaims(Guid userId, bool hasLongTimeToLive, IList<string> roles);
    }
}