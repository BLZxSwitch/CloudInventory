namespace Api.Transports.ForgotPassword
{
    public class SetPasswordRequest : ResetPasswordRequest
    {
        public bool ToSAccepted { get; set; }
    }
}
