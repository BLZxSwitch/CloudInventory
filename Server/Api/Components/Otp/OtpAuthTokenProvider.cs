using Api.Components.Jwt.JwtSecurityTokenProvider;
using Api.Components.Jwt.JwtSecurityTokenWriter;
using Api.Components.Jwt.JwtTokenExpireDateTimeProvider;
using Api.Components.Jwt.SigningCredentialsProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System;

namespace Api.Components.Otp
{
    [As(typeof(IOtpAuthTokenProvider))]
    class OtpAuthTokenProvider : IOtpAuthTokenProvider
    {
        private readonly IJwtSecurityTokenProvider _jwtSecurityTokenProvider;
        private readonly IJwtSecurityTokenWriter _jwtSecurityTokenWriter;
        private readonly IOtpAuthTokenClaimsProvider _otpAuthTokenClaimsProvider;
        private readonly IJwtTokenExpireDateTimeProvider _jwtTokenExpireDateTimeProvider;
        private readonly ISigningCredentialsProvider _signingCredentialsProvider;

        public OtpAuthTokenProvider(
            ISigningCredentialsProvider signingCredentialsProvider,
            IJwtTokenExpireDateTimeProvider jwtTokenExpireDateTimeProvider,
            IJwtSecurityTokenProvider jwtSecurityTokenProvider,
            IJwtSecurityTokenWriter jwtSecurityTokenWriter,
            IOtpAuthTokenClaimsProvider otpAuthTokenClaimsProvider)
        {
            _signingCredentialsProvider = signingCredentialsProvider;
            _jwtTokenExpireDateTimeProvider = jwtTokenExpireDateTimeProvider;
            _jwtSecurityTokenProvider = jwtSecurityTokenProvider;
            _jwtSecurityTokenWriter = jwtSecurityTokenWriter;
            _otpAuthTokenClaimsProvider = otpAuthTokenClaimsProvider;
        }

        public string Get(Guid userId)
        {
            var claims = _otpAuthTokenClaimsProvider.GetClaims(userId);
            var signingCredentials = _signingCredentialsProvider.Get();
            var expires = _jwtTokenExpireDateTimeProvider.Get(false);
            var jwtSecurityToken = _jwtSecurityTokenProvider.Create(claims, expires, signingCredentials);
            var token = _jwtSecurityTokenWriter.Write(jwtSecurityToken);
            return token;
        }
    }
}