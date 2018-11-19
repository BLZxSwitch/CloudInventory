namespace Api.Components.Otp
{
    public class AuthOtpOptions
    {
        public string IssuerName { get; set; }
        public uint Digits { get; set; }
        public string StorageKey { get; set; }
    }
}