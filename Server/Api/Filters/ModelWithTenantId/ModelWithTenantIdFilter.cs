using Api.Components.CurrentTenantProvider;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Filters.ModelWithTenantId
{
    [As(typeof(ModelWithTenantIdFilter))]
    public class ModelWithTenantIdFilter : IAsyncActionFilter
    {
        private readonly ICurrentTenantProvider _currentTenantProvider;

        public ModelWithTenantIdFilter(
            ICurrentTenantProvider currentTenantProvider)
        {
            _currentTenantProvider = currentTenantProvider;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var user = (context.Controller as ControllerBase).User;
            foreach (var model in context.ActionArguments.Values.Select(v => v as IModelWithTenantId).Where(v => v != null))
            {
                model.TenantId = await _currentTenantProvider.GetTenantIdAsync(user);
            }

            await next();
        }
    }
}
