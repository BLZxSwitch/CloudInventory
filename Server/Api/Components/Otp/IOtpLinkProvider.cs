namespace Api.Components.Otp
{
    public interface IOtpLinkProvider
    {
        string Get(OtpLinkRequest request, string secretKey);
    }
}