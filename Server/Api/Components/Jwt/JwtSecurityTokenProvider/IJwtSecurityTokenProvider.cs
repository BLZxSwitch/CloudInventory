using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Api.Components.Jwt.JwtSecurityTokenProvider
{
    public interface IJwtSecurityTokenProvider
    {
        JwtSecurityToken Create(List<Claim> claims, DateTime expires, SigningCredentials signingCredentials);
    }
}