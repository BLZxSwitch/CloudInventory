using Api.Components.SecurityUsers;
using Api.Transports.Common;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using AutoMapper;
using EF.Models;
using System;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    [As(typeof(IOtpActivationService))]
    class OtpActivationService : IOtpActivationService
    {
        private readonly IMapper _mapper;
        private readonly Func<IInventContext> _contextFactory;
        private readonly Func<IInventContext, ISecurityUserProvider> _securityUserProviderFactory;
        private readonly IProtectedDataProvider _protectedDataProvider;

        public OtpActivationService(
            IMapper mapper,
            Func<IInventContext> contextFactory,
            Func<IInventContext, ISecurityUserProvider> securityUserProviderFactory,
            IProtectedDataProvider protectedDataProvider)
        {
            _mapper = mapper;
            _contextFactory = contextFactory;
            _securityUserProviderFactory = securityUserProviderFactory;
            _protectedDataProvider = protectedDataProvider;
        }

        public async Task<UserSettingsDTO> ActivateAsync(OtpActivationRequestParams credentials)
        {
            var secretKey = _protectedDataProvider.Protect(credentials.SecretKey);
            var userId = credentials.UserId;

            using (var context = _contextFactory())
            using (var securityUserProvider = _securityUserProviderFactory(context))
            {
                var securityUser = await securityUserProvider.GetByUserIdAsync(userId);

                securityUser.TwoFactorAuthenticationSecretKey = secretKey;

                context.Update(securityUser);

                await context.SaveChangesAsync();

                return _mapper.Map<UserSettingsDTO>(securityUser);
            }
        }
    }
}