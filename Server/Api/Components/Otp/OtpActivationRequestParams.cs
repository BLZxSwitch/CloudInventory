using System;

namespace Api.Components.Otp
{
    public class OtpActivationRequestParams
    {
        public Guid UserId { get; set; }
        public byte[] SecretKey { get; set; }
        public string Otp { get; set; }
        public string Password { get; set; }
    }
}