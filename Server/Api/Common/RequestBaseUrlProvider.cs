using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Http;
using System;

namespace Api.Common
{
    [As(typeof(IRequestBaseUrlProvider))]
    public class RequestBaseUrlProvider : IRequestBaseUrlProvider
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public RequestBaseUrlProvider(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public string Get()
        {
            var request = _contextAccessor.HttpContext.Request;
            var uriBuilder = new UriBuilder();
            uriBuilder.Scheme = request.Scheme;
            uriBuilder.Host = request.Host.Host;
            if (request.Host.Port.HasValue)
            {
                uriBuilder.Port = request.Host.Port.Value;
            }

            return uriBuilder.Uri.ToString();
        }
    }
}
