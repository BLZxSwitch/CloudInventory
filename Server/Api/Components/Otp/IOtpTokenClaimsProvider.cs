using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Api.Components.Otp
{
    public interface IOtpTokenClaimsProvider
    {
        List<Claim> GetClaims(Guid userId, string secretKey);
    }
}