using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.Extensions.Options;
using SecurityDriven.Inferno;
using System;
using System.Text;

namespace Api.Components.Otp
{
    [As(typeof(IProtectedDataProvider))]
    class ProtectedDataProvider : IProtectedDataProvider
    {
        private readonly AuthOtpOptions _options;

        public ProtectedDataProvider(IOptions<AuthOtpOptions> options)
        {
            _options = options.Value;
        }

        public string Protect(byte[] data)
        {
            var entropy = Encoding.UTF8.GetBytes(_options.StorageKey);
            var protectedData = SuiteB.Encrypt(entropy, data.AsArraySegment());
            var str = Convert.ToBase64String(protectedData);
            return str;
        }

        public byte[] Unprotect(string str)
        {
            var protectedData = Convert.FromBase64String(str);
            var entropy = Encoding.UTF8.GetBytes(_options.StorageKey);
            var data = SuiteB.Decrypt(entropy, protectedData.AsArraySegment());
            return data;
        }
    }
}