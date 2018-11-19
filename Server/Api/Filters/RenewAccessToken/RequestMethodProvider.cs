using System;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Http;

namespace Api.Filters.RenewAccessToken
{
    [As(typeof(IRequestMethodProvider))]
    class RequestMethodProvider : IRequestMethodProvider
    {
        private readonly HttpContext _context;

        public RequestMethodProvider(HttpContext context)
        {
            _context = context;
        }
        
        public bool IsOptionsRequest()
        {
            return _context.Request.Method.Equals("OPTIONS", StringComparison.InvariantCultureIgnoreCase);
        }
    }
}