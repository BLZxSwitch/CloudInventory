using System.Threading.Tasks;
using Api.Components.ActionExecutingContext;
using Api.Components.Factories;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ActionExecutingContext = Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext;

namespace Api.Filters.ModelStateFilter
{
    [As(typeof(ModelStateFilter))]
    public class ModelStateFilter : IAsyncActionFilter
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IFactory<ActionExecutingContext, IActionExecutingContext> _contextFactory;

        public ModelStateFilter(
            IHostingEnvironment hostingEnvironment,
            IFactory<ActionExecutingContext, IActionExecutingContext> contextFactory)
        {
            _hostingEnvironment = hostingEnvironment;
            _contextFactory = contextFactory;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var ctx = _contextFactory.Create(context);

            if (ctx.IsModelValid == false)
            {
                var badRequestResult = GetBadRequestResult(ctx);
                ctx.SetResult(badRequestResult);
                return;
            }

            await next();
        }

        private IActionResult GetBadRequestResult(IActionExecutingContext context)
        {
            if (_hostingEnvironment.IsDevelopment())
                return new BadRequestObjectResult(context.ModelState);
            return new BadRequestResult();
        }
    }
}