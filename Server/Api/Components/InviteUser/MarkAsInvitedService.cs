using System;
using System.Threading.Tasks;
using Api.Components.SecurityUsers;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;

namespace Api.Components.InviteUser
{
    [As(typeof(IMarkAsInvitedService))]
    public class MarkAsInvitedService : IMarkAsInvitedService
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly Func<IInventContext, ISecurityUserProvider> _securityUserProviderFactory;

        public MarkAsInvitedService(Func<IInventContext> contextFactory,
             Func<IInventContext, ISecurityUserProvider> securityUserProviderFactory)
        {
            _contextFactory = contextFactory;
            _securityUserProviderFactory = securityUserProviderFactory;
        }

        public async Task MarkAsync(Guid securityUserId)
        {
            using (var context = _contextFactory())
            using (var _securityUserProvider = _securityUserProviderFactory(context))
            {
                var securityUser = await _securityUserProvider.GetByIdAsync(securityUserId);

                securityUser.IsInvited = true;

                context.Update(securityUser);

                await context.SaveChangesAsync();
            }
        }
    }
}