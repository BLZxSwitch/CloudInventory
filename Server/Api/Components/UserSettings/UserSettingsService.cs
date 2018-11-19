using Api.Components.SecurityUsers;
using Api.Transports.Common;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using AutoMapper;
using EF.Models;
using System;
using System.Threading.Tasks;

namespace Api.Components.UserSettings
{
    [As(typeof(IUserSettingsService))]
    public class UserSettingsService : IUserSettingsService
    {
        private readonly IMapper _mapper;
        private readonly Func<IInventContext> _contextFactory;
        private readonly Func<IInventContext, ISecurityUserProvider> _securityUserProviderFactory;

        public UserSettingsService(IMapper mapper,
            Func<IInventContext> contextFactory,
            Func<IInventContext, ISecurityUserProvider> securityUserProviderFactory)
        {
            _mapper = mapper;
            _contextFactory = contextFactory;
            _securityUserProviderFactory = securityUserProviderFactory;
        }

        public async Task<UserSettingsDTO> UpdateAsync(UserSettingsDTO userSettings, Guid userId)
        {
            using (var context = _contextFactory())
            using (var securityUserProvider = _securityUserProviderFactory(context))
            {
                var securityUser = await securityUserProvider.GetByUserIdAsync(userId);

                securityUser = _mapper.Map(userSettings, securityUser);

                context.Update(securityUser);

                await context.SaveChangesAsync();

                return _mapper.Map<UserSettingsDTO>(securityUser);
            }
        }
    }
}
