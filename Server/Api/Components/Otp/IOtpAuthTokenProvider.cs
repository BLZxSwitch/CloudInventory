using System;

namespace Api.Components.Otp
{
    public interface IOtpAuthTokenProvider
    {
        string Get(Guid userId);
    }
}