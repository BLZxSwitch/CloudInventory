using Api.Components.CurrentUserProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Components.CurrentSecurityUser
{
    [As(typeof(ICurrentSecurityUserProvider))]
    public class CurrentSecurityUserProvider : ICurrentSecurityUserProvider
    {
        private readonly ICurrentUserProvider _currentUserProvider;

        public CurrentSecurityUserProvider(ICurrentUserProvider currentUserProvider)
        {
            _currentUserProvider = currentUserProvider;
        }

        public async Task<Guid> GetSecurityUserIdAsync(ClaimsPrincipal claimsPrincipal)
        {
            var user = await _currentUserProvider.GetUserAsync(claimsPrincipal);
            return user.SecurityUser.Id;
        }
    }
}
