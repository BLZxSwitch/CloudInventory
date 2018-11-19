using System;

namespace Api.Components.Jwt.UserIdClaimValueProvider
{
    public interface IUserIdClaimValueProvider
    {
        Guid GetValue();
    }
}