using System;

namespace Api.Components.Jwt.JwtTokenExpireDateTimeProvider
{
    public interface IJwtTokenExpireDateTimeProvider
    {
        DateTime Get(bool hasLongTimeToLive);
    }
}