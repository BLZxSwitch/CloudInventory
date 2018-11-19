using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.CurrentUserProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.CurrentTenantProvider
{
    [As(typeof(ICurrentTenantProvider))]
    class CurrentTenantProvider : ICurrentTenantProvider
    {
        private readonly ICurrentUserProvider _currentUserProvider;

        public CurrentTenantProvider(ICurrentUserProvider currentUserProvider)
        {
            _currentUserProvider = currentUserProvider;
        }

        public async Task<Guid> GetTenantIdAsync(ClaimsPrincipal claimsPrincipal)
        {
            var user = await _currentUserProvider.GetUserAsync(claimsPrincipal);
            return user.SecurityUser.TenantId;
        }
    }
}