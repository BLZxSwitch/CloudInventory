namespace Api.Components.Otp
{
    public interface IOtpCodeValidationService
    {
        bool Validate(byte[] secretKey, int code);
    }
}