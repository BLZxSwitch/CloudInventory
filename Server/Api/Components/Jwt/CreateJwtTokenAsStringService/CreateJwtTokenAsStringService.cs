using System;
using System.Collections.Generic;
using Api.Components.Jwt.JwtSecurityTokenProvider;
using Api.Components.Jwt.JwtSecurityTokenWriter;
using Api.Components.Jwt.JwtTokenClaimsProvider;
using Api.Components.Jwt.JwtTokenExpireDateTimeProvider;
using Api.Components.Jwt.SigningCredentialsProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Jwt.CreateJwtTokenAsStringService
{
    [As(typeof(ICreateJwtTokenAsStringService))]
    internal class CreateJwtTokenAsStringService : ICreateJwtTokenAsStringService
    {
        private readonly IJwtSecurityTokenProvider _jwtSecurityTokenProvider;
        private readonly IJwtSecurityTokenWriter _jwtSecurityTokenWriter;
        private readonly IJwtTokenClaimsProvider _jwtTokenClaimsProvider;
        private readonly IJwtTokenExpireDateTimeProvider _jwtTokenExpireDateTimeProvider;
        private readonly ISigningCredentialsProvider _signingCredentialsProvider;

        public CreateJwtTokenAsStringService(
            IJwtTokenClaimsProvider jwtTokenClaimsProvider,
            ISigningCredentialsProvider signingCredentialsProvider,
            IJwtTokenExpireDateTimeProvider jwtTokenExpireDateTimeProvider,
            IJwtSecurityTokenProvider jwtSecurityTokenProvider,
            IJwtSecurityTokenWriter jwtSecurityTokenWriter)
        {
            _jwtTokenClaimsProvider = jwtTokenClaimsProvider;
            _signingCredentialsProvider = signingCredentialsProvider;
            _jwtTokenExpireDateTimeProvider = jwtTokenExpireDateTimeProvider;
            _jwtSecurityTokenProvider = jwtSecurityTokenProvider;
            _jwtSecurityTokenWriter = jwtSecurityTokenWriter;
        }

        public string Create(Guid userId, bool hasLongTimeToLive, IList<string> roles)
        {
            var claims = _jwtTokenClaimsProvider.GetClaims(userId, hasLongTimeToLive, roles);
            var signingCredentials = _signingCredentialsProvider.Get();
            var expires = _jwtTokenExpireDateTimeProvider.Get(hasLongTimeToLive);
            var jwtSecurityToken = _jwtSecurityTokenProvider.Create(claims, expires, signingCredentials);
            return _jwtSecurityTokenWriter.Write(jwtSecurityToken);
        }
    }
}