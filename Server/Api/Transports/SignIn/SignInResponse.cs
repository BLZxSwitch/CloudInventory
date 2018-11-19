using Api.Transports.Common;

namespace Api.Transports.SignIn
{
    public class SignInResponse
    {
        public string Token { get; set; }
        public UserDTO User { get; set; }
    }
}