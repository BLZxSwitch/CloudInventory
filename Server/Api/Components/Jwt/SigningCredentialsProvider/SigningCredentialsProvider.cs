using Api.Components.Jwt.SymmetricSecurityKeyProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.SigningCredentialsProvider
{
    [As(typeof(ISigningCredentialsProvider))]
    internal class SigningCredentialsProvider : ISigningCredentialsProvider
    {
        private readonly ISymmetricSecurityKeyProvider _symmetricSecurityKeyProvider;

        public SigningCredentialsProvider(
            ISymmetricSecurityKeyProvider symmetricSecurityKeyProvider)
        {
            _symmetricSecurityKeyProvider = symmetricSecurityKeyProvider;
        }

        public SigningCredentials Get()
        {
            var symmetricSecurityKey = _symmetricSecurityKeyProvider.GetKey();
            return new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        }
    }
}