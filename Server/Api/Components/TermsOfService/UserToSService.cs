using System;
using System.Threading.Tasks;
using Api.Components.NowProvider;
using Api.Components.SecurityUsers;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using Microsoft.Extensions.Options;

namespace Api.Components.TermsOfService
{
    [As(typeof(IUserToSService))]
    public class UserToSService : IUserToSService
    {

        private readonly Func<IInventContext> _contextFactory;
        private readonly Func<IInventContext, ISecurityUserProvider> _securityUserProviderFactory;
        private readonly INowProvider _nowProvider;
        private readonly TermsOfServiceOptions _options;

        public UserToSService(Func<IInventContext> contextFactory,
            INowProvider nowProvider,
            IOptions<TermsOfServiceOptions> options,
             Func<IInventContext, ISecurityUserProvider> securityUserProviderFactory)
        {
            _nowProvider = nowProvider;
            _contextFactory = contextFactory;
            _options = options.Value;
            _securityUserProviderFactory = securityUserProviderFactory;
        }

        public async Task AcceptAsync(Guid securityUserId)
        {
            using (var context = _contextFactory())
            using (var _securityUserProvider = _securityUserProviderFactory(context))
            {
                var securityUser = await _securityUserProvider.GetByIdAsync(securityUserId);

                securityUser.ToSAcceptedDate = _nowProvider.Now();

                context.Update(securityUser);

                await context.SaveChangesAsync();
            }
        }

        public async Task<bool> IsAcceptedAsync(Guid securityUserId)
        {
            using (var context = _contextFactory())
            using (var _securityUserProvider = _securityUserProviderFactory(context))
            {
                var securityUser = await _securityUserProvider.GetByIdAsync(securityUserId);

                return securityUser.ToSAcceptedDate.HasValue && (securityUser.ToSAcceptedDate > _options.UpdateDate);
            }
        }
    }
}