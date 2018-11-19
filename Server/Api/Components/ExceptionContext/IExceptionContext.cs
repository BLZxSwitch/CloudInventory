using System;
using Microsoft.AspNetCore.Mvc;

namespace Api.Components.ExceptionContext
{
    public interface IExceptionContext
    {
        Exception Exception { get; }
        void SetResult(BadRequestObjectResult result);
        void ResetException();
    }
}