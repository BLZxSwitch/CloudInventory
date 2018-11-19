using System;

namespace Api.Components.Otp
{
    public interface IOtpTokenProvider
    {
        string Get(Guid userId, string secretKey);
    }
}