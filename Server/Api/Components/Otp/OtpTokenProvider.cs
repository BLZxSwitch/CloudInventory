using Api.Components.Jwt.JwtSecurityTokenProvider;
using Api.Components.Jwt.JwtSecurityTokenWriter;
using Api.Components.Jwt.JwtTokenExpireDateTimeProvider;
using Api.Components.Jwt.SigningCredentialsProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using System;

namespace Api.Components.Otp
{
    [As(typeof(IOtpTokenProvider))]
    class OtpTokenProvider : IOtpTokenProvider
    {
        private readonly IJwtSecurityTokenProvider _jwtSecurityTokenProvider;
        private readonly IJwtSecurityTokenWriter _jwtSecurityTokenWriter;
        private readonly IJwtTokenExpireDateTimeProvider _jwtTokenExpireDateTimeProvider;
        private readonly IOtpTokenClaimsProvider _otpTokenClaimsProvider;
        private readonly ISigningCredentialsProvider _signingCredentialsProvider;

        public OtpTokenProvider(
            IOtpTokenClaimsProvider otpTokenClaimsProvider,
            ISigningCredentialsProvider signingCredentialsProvider,
            IJwtTokenExpireDateTimeProvider jwtTokenExpireDateTimeProvider,
            IJwtSecurityTokenProvider jwtSecurityTokenProvider,
            IJwtSecurityTokenWriter jwtSecurityTokenWriter)
        {
            _otpTokenClaimsProvider = otpTokenClaimsProvider;
            _signingCredentialsProvider = signingCredentialsProvider;
            _jwtTokenExpireDateTimeProvider = jwtTokenExpireDateTimeProvider;
            _jwtSecurityTokenProvider = jwtSecurityTokenProvider;
            _jwtSecurityTokenWriter = jwtSecurityTokenWriter;
        }

        public string Get(Guid userId, string secretKey)
        {
            var claims = _otpTokenClaimsProvider.GetClaims(userId, secretKey);
            var signingCredentials = _signingCredentialsProvider.Get();
            var expires = _jwtTokenExpireDateTimeProvider.Get(true);
            var jwtSecurityToken = _jwtSecurityTokenProvider.Create(claims, expires, signingCredentials);
            var token = _jwtSecurityTokenWriter.Write(jwtSecurityToken);
            return token;
        }
    }
}