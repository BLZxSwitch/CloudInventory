namespace Api.Transports.AuthOtp
{
    public class OtpActivationRequest
    {
        public string Otp { get; set; }
        public string Password { get; set; }
        public string OtpToken { get; set; }
    }
}