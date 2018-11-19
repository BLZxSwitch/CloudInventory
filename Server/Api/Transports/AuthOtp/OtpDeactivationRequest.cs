namespace Api.Transports.AuthOtp
{
    public class OtpDeactivationRequest
    {
        public string Password { get; set; }
        public string Otp { get; set; }
    }
}