using System;

namespace Api.Components.Otp
{
    public interface IUserIdFromOtpTokenProvider
    {
        Guid Get(string token);
    }
}