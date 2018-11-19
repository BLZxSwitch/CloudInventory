using System;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    public interface IOtpSignInValidationService
    {
        Task<bool> Validate(Guid userId, int credentialsCode);
    }
}