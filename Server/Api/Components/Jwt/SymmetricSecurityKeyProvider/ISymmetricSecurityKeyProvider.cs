using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.SymmetricSecurityKeyProvider
{
    public interface ISymmetricSecurityKeyProvider
    {
        SymmetricSecurityKey GetKey();
    }
}