using System;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Http;

namespace Api.Filters.RenewAccessToken
{
    [As(typeof(IAuthorizationHeaderAsBearerTokenProvider))]
    internal class AuthorizationHeaderAsBearerTokenProvider : IAuthorizationHeaderAsBearerTokenProvider
    {
        private const string BearerSchemaPrefix = "Bearer ";

        private readonly HttpContext _context;

        public AuthorizationHeaderAsBearerTokenProvider(HttpContext context)
        {
            _context = context;
        }

        public string AsBearerToken()
        {
            var value = (string) _context.Request.Headers["Authorization"];
            if (string.IsNullOrEmpty(value)) return null;
            if (value.StartsWith(BearerSchemaPrefix, StringComparison.OrdinalIgnoreCase) == false) return null;
            return value.Substring(BearerSchemaPrefix.Length).Trim();
        }
    }
}