using Api.Components.Identities;
using Api.Components.SetPasswordEmail;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.Extensions.Localization;
using System.Threading.Tasks;

namespace Api.Components.InviteUser
{
    [As(typeof(IInviteUserService))]
    public class InviteUserService : IInviteUserService
    {
        private readonly ISetPasswordEmailService _setPasswordEmailService;
        private readonly IStringLocalizer<InviteUserService> _localizer;
        private readonly IUserManager _userManager;

        public InviteUserService(
            ISetPasswordEmailService setPasswordEmailService,
            IStringLocalizer<InviteUserService> localizer,
            IUserManager userManager)
        {
            _setPasswordEmailService = setPasswordEmailService;
            _localizer = localizer;
            _userManager = userManager;
        }

        public async Task SendPasswordResetTokenAsync(User user)
        {
            var token = await _userManager.GenerateInviteUserTokenAsync(user);

            await _setPasswordEmailService.GenerateAndSendTokenAsync(user,
                token,
                "/auth/set-password",
                _localizer["INVITE_USER_EMAIL_SUBJECT"],
                _localizer["INVITE_USER_EMAIL_BODY"]);
        }
    }
}
