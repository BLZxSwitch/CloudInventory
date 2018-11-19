using System.IdentityModel.Tokens.Jwt;

namespace Api.Components.Jwt.JwtSecurityTokenWriter
{
    public interface IJwtSecurityTokenWriter
    {
        string Write(JwtSecurityToken jwtSecurityToken);
    }
}