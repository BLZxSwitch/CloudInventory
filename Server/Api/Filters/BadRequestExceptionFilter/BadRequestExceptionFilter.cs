using Api.Common.Exceptions;
using Api.Components.ExceptionContext;
using Api.Components.Factories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ExceptionContext = Microsoft.AspNetCore.Mvc.Filters.ExceptionContext;

namespace Api.Filters.BadRequestExceptionFilter
{
    public class BadRequestExceptionFilter : IExceptionFilter
    {
        private readonly IFactory<ExceptionContext, IExceptionContext> _contextFactor;

        public BadRequestExceptionFilter(IFactory<ExceptionContext, IExceptionContext> contextFactor)
        {
            _contextFactor = contextFactor;
        }

        public void OnException(ExceptionContext context)
        {
            var ctx = _contextFactor.Create(context);
            if (ctx.Exception is BadRequestException)
            {
                ctx.SetResult(new BadRequestObjectResult(ctx.Exception.Message));
                ctx.ResetException();
            }
        }
    }
}