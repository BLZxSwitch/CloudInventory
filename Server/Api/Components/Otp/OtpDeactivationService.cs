using Api.Components.SecurityUsers;
using Api.Transports.Common;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using AutoMapper;
using EF.Models;
using System;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    [As(typeof(IOtpDeactivationService))]
    class OtpDeactivationService : IOtpDeactivationService
    {
        private readonly IMapper _mapper;
        private readonly Func<IInventContext> _contextFactory;
        private readonly Func<IInventContext, ISecurityUserProvider> _securityUserProviderFactory;

        public OtpDeactivationService(
            IMapper mapper,
            Func<IInventContext> contextFactory,
            Func<IInventContext, ISecurityUserProvider> securityUserProviderFactory)
        {
            _mapper = mapper;
            _contextFactory = contextFactory;
            _securityUserProviderFactory = securityUserProviderFactory;
        }

        public async Task<UserSettingsDTO> DeactivateAsync(OtpActivationRequestParams credentials)
        {
            var userId = credentials.UserId;

            using (var context = _contextFactory())
            using (var securityUserProvider = _securityUserProviderFactory(context))
            {
                var securityUser = await securityUserProvider.GetByUserIdAsync(userId);

                securityUser.TwoFactorAuthenticationSecretKey = null;

                context.Update(securityUser);

                await context.SaveChangesAsync();

                return _mapper.Map<UserSettingsDTO>(securityUser);
            }
        }
    }
}