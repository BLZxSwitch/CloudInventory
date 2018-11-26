namespace Api.Transports.Common
{
    public class UserSettingsDTO
    {
        public bool IsTwoFactorAuthenticationEnabled { get; set; }

        public string Language { get; set; }

        //public bool HasUserPicture { get; set; }
    }
}