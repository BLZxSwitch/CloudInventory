namespace Api.Transports.SignIn
{
    public class SignInRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
        public string ValidationToken { get; set; }
    }
}