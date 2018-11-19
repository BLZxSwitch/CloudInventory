using Api.Components.SecurityUsers;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using SecurityDriven.Inferno.Extensions;
using System;
using System.Threading.Tasks;

namespace Api.Components.Otp
{
    [As(typeof(IOtpSecretKeyProvider))]
    class OtpSecretKeyProvider : IOtpSecretKeyProvider
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly Func<IInventContext, ISecurityUserProvider> _securityUserProviderFactory;
        private readonly IRandomArrayGenerator _randomArrayGenerator;
        private readonly IProtectedDataProvider _protectedDataProvider;

        public OtpSecretKeyProvider(
            Func<IInventContext> contextFactory,
            Func<IInventContext, ISecurityUserProvider> securityUserProviderFactory,
            IRandomArrayGenerator randomArrayGenerator,
            IProtectedDataProvider protectedDataProvider)
        {
            _contextFactory = contextFactory;
            _securityUserProviderFactory = securityUserProviderFactory;
            _randomArrayGenerator = randomArrayGenerator;
            _protectedDataProvider = protectedDataProvider;
        }

        public string Get()
        {
            var bytes = _randomArrayGenerator.Get();

            return bytes.ToBase32(config: Base32Config.Rfc);
        }

        public async Task<byte[]> ReadAsync(Guid userId)
        {
            string secretKey;
            using (var context = _contextFactory())
            using (var securityUserProvider = _securityUserProviderFactory(context))
            {
                var securityUser = await securityUserProvider.GetByUserIdAsync(userId);
                secretKey = securityUser.TwoFactorAuthenticationSecretKey;
            }

            var secretKeyBytes = _protectedDataProvider.Unprotect(secretKey);
            return secretKeyBytes;
        }
    }
}