namespace Api.Transports.AuthOtp
{
    public class OtpGetLinkResponse
    {
        public string OtpLink { get; set; }
        public string OtpToken { get; set; }
        public string SecretKey { get; set; }
    }
}