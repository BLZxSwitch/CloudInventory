using System;
using Api.Components.NowProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.Extensions.Options;

namespace Api.Components.Jwt.JwtTokenExpireDateTimeProvider
{
    [As(typeof(IJwtTokenExpireDateTimeProvider))]
    internal class JwtTokenExpireDateTimeProvider : IJwtTokenExpireDateTimeProvider
    {
        private readonly INowProvider _nowProvider;
        private readonly JwtTokenOptions _options;

        public JwtTokenExpireDateTimeProvider(
            IOptions<JwtTokenOptions> options,
            INowProvider nowProvider)
        {
            _nowProvider = nowProvider;
            _options = options.Value;
        }

        public DateTime Get(bool hasLongTimeToLive)
        {
            var now = _nowProvider.Now();
            if (hasLongTimeToLive)
                return now.AddDays(_options.ExpireDaysLongToken);
            return now.AddMinutes(_options.ExpireMinutesShortToken);
        }
    }
}