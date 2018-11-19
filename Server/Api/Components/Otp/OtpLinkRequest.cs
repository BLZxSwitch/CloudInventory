using System;

namespace Api.Components.Otp
{
    public class OtpLinkRequest
    {
        public string IssuerName { get; set; }
        public string UserEmail { get; set; }
        public Guid UserId { get; set; }
    }
}