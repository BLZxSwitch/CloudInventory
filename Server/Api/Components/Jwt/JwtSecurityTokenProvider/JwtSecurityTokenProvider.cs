using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.JwtSecurityTokenProvider
{
    [As(typeof(IJwtSecurityTokenProvider))]
    internal class JwtSecurityTokenProvider : IJwtSecurityTokenProvider
    {
        private readonly JwtTokenOptions _options;

        public JwtSecurityTokenProvider(IOptions<JwtTokenOptions> options)
        {
            _options = options.Value;
        }

        public JwtSecurityToken Create(List<Claim> claims, DateTime expires, SigningCredentials signingCredentials)
        {
            return new JwtSecurityToken(
                _options.Issuer,
                _options.Issuer,
                claims,
                expires: expires,
                signingCredentials: signingCredentials);
        }
    }
}