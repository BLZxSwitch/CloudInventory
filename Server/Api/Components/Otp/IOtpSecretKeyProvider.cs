using System;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    public interface IOtpSecretKeyProvider
    {
        string Get();
        Task<byte[]> ReadAsync(Guid userId);
    }
}