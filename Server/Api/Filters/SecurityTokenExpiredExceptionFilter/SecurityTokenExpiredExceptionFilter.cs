using Api.Components.ExceptionContext;
using Api.Components.Factories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using ExceptionContext = Microsoft.AspNetCore.Mvc.Filters.ExceptionContext;

namespace Api.Filters.SecurityTokenExpiredExceptionFilter
{
    public class SecurityTokenExpiredExceptionFilter : IExceptionFilter
    {
        private readonly IFactory<ExceptionContext, IExceptionContext> _contextFactor;

        public SecurityTokenExpiredExceptionFilter(IFactory<ExceptionContext, IExceptionContext> contextFactor)
        {
            _contextFactor = contextFactor;
        }

        public void OnException(ExceptionContext context)
        {
            var ctx = _contextFactor.Create(context);
            if (ctx.Exception is SecurityTokenExpiredException)
            {
                ctx.SetResult(new BadRequestObjectResult("INVALID_OTP_TOKEN"));
                ctx.ResetException();
            }
        }
    }
}