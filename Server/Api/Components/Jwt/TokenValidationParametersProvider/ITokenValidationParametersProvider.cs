using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.TokenValidationParametersProvider
{
    public interface ITokenValidationParametersProvider
    {
        TokenValidationParameters GetParameters();
    }
}