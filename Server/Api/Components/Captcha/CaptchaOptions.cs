namespace Api.Components.Captcha
{
    public class CaptchaOptions
    {
        public string Secret { get; set; }
        public string ClientKey { get; set; }
        public string ValidatorUrl { get; set; }
        public uint TokenLifespanInMinutes { get; set; }
    }
}