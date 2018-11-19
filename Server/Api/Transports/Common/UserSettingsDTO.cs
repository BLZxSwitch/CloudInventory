using EF.Models.Enums;

namespace Api.Transports.Common
{
    public class UserSettingsDTO
    {
        public bool IsTwoFactorAuthenticationEnabled { get; set; }

        public string Language { get; set; }
    }
}