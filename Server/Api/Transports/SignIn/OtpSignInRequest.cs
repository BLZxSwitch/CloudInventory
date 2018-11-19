namespace Api.Transports.SignIn
{
    public class OtpSignInRequest
    {
        public string Token { get; set; }
        public string ValidationToken { get; set; }
        public int Code { get; set; }
    }
}