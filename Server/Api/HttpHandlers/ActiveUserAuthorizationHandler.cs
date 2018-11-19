using System.Linq;
using System.Threading.Tasks;
using Api.Components.CurrentUserProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Authorization;

namespace Api.HttpHandlers
{
    [As(typeof(IAuthorizationHandler))]
    [SingleInstance]
    public class ActiveUserAuthorizationHandler : IAuthorizationHandler
    {
        private readonly ICurrentUserProvider _currentUserProvider;

        public ActiveUserAuthorizationHandler(ICurrentUserProvider currentUserProvider)
        {
            _currentUserProvider = currentUserProvider;
        }

        public async Task HandleAsync(AuthorizationHandlerContext context)
        {
            if (context.User.Identities.Any(identity => identity.IsAuthenticated) == false)
            {
                context.Fail();
                return;
            }
            
            var user = await _currentUserProvider.GetUserAsync(context.User);
            if (user.SecurityUser.IsActive == false)
                context.Fail();
            else
            {
                foreach (var requirement in context.Requirements)
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}