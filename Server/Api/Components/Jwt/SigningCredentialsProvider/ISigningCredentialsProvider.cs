using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.SigningCredentialsProvider
{
    public interface ISigningCredentialsProvider
    {
        SigningCredentials Get();
    }
}