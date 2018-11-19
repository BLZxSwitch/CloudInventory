using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.Identities;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;

namespace Api.Components.CurrentUserProvider
{
    [As(typeof(ICurrentUserProvider))]
    class CurrentUserProvider : ICurrentUserProvider
    {
        private readonly Func<IUserManager> _userManagerFactory;

        public CurrentUserProvider(Func<IUserManager> userManagerFactory)
        {
            _userManagerFactory = userManagerFactory;
        }
        
        public async Task<User> GetUserAsync(ClaimsPrincipal principal)
        {
            using (var userManager = _userManagerFactory())
            {
                var userId = userManager.GetUserId(principal);
                return await userManager.FindByIdAsync(userId);
            }
        }
    }
}