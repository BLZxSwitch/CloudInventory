using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Api.Components.Otp
{
    public interface IOtpAuthTokenClaimsProvider
    {
        List<Claim> GetClaims(Guid userId);
    }
}