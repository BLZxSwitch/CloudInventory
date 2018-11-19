using System.Linq;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace Api.Filters.RenewAccessToken
{
    [As(typeof(IEndpointProvider))]
    public class EndpointProvider : IEndpointProvider
    {
        private readonly ControllerActionDescriptor _controllerActionDescriptor;

        public EndpointProvider(ControllerActionDescriptor controllerActionDescriptor)
        {
            _controllerActionDescriptor = controllerActionDescriptor;
        }

        public bool IsProtected()
        {
            var attributes = _controllerActionDescriptor.MethodInfo.GetCustomAttributes(inherit: true)
                .Concat(_controllerActionDescriptor.ControllerTypeInfo.GetCustomAttributes(inherit: true));

            return attributes.Any(a => a.GetType() == typeof(AuthorizeAttribute));
        }
    }
}