using System.IdentityModel.Tokens.Jwt;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Jwt.JwtSecurityTokenWriter
{
    [As(typeof(IJwtSecurityTokenWriter))]
    internal class JwtSecurityTokenWriter : IJwtSecurityTokenWriter
    {
        public string Write(JwtSecurityToken jwtSecurityToken)
        {
            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }
    }
}