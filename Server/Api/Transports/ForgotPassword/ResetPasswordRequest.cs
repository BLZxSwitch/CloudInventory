using System;

namespace Api.Transports.ForgotPassword
{
    public class ResetPasswordRequest
    {
        public Guid UserId { get; set; }
        public string Password { get; set; }
        public string Code { get; set; }
    }
}
