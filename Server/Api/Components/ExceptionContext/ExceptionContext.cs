using System;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Mvc;

namespace Api.Components.ExceptionContext
{
    [As(typeof(IExceptionContext))]
    class ExceptionContext : IExceptionContext
    {
        private readonly Microsoft.AspNetCore.Mvc.Filters.ExceptionContext _context;

        public ExceptionContext(Microsoft.AspNetCore.Mvc.Filters.ExceptionContext context)
        {
            _context = context;
        }

        public Exception Exception => _context.Exception;

        public void SetResult(BadRequestObjectResult result)
        {
            _context.Result = result;
        }

        public void ResetException()
        {
            _context.Exception = null;
        }
    }
}