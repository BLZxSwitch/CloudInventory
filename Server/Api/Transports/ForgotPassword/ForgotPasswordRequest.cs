namespace Api.Transports.ForgotPassword
{
    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
        public string ValidationToken { get; set; }
    }
}
