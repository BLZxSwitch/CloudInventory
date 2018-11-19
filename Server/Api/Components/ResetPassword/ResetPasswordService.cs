using Api.Components.Identities;
using Api.Components.SetPasswordEmail;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.Extensions.Localization;
using System.Threading.Tasks;

namespace Api.Components.ResetPassword
{
    [As(typeof(IResetPasswordService))]
    public class ResetPasswordService : IResetPasswordService
    {
        private readonly ISetPasswordEmailService _setPasswordEmailService;
        private readonly IStringLocalizer<ResetPasswordService> _localizer;
        private readonly IUserManager _userManager;

        public ResetPasswordService(
            ISetPasswordEmailService setPasswordEmailService,
            IStringLocalizer<ResetPasswordService> localizer,
            IUserManager userManager)
        {
            _setPasswordEmailService = setPasswordEmailService;
            _localizer = localizer;
            _userManager = userManager;
        }

        public async Task SendPasswordResetTokenAsync(User user)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            await _setPasswordEmailService.GenerateAndSendTokenAsync(user,
                token,
                "/auth/reset",
                _localizer["RESET_PASSWORD_EMAIL_SUBJECT"],
                _localizer["RESET_PASSWORD_EMAIL_BODY"]);
        }
    }
}
