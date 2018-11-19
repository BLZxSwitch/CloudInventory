using System.Text;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.SymmetricSecurityKeyProvider
{
    [As(typeof(ISymmetricSecurityKeyProvider))]
    internal class SymmetricSecurityKeyProvider : ISymmetricSecurityKeyProvider
    {
        private readonly JwtTokenOptions _options;

        public SymmetricSecurityKeyProvider(IOptions<JwtTokenOptions> options)
        {
            _options = options.Value;
        }

        public SymmetricSecurityKey GetKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));
        }
    }
}