using Api.Components.CurrentSecurityUser;
using Api.Components.Factories;
using Api.Components.TermsOfService;
using Api.Filters.RenewAccessToken;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace Api.Filters.TermsOfService
{
    public class TermsOfServiceFilter : IAsyncActionFilter
    {
        private readonly IFactory<HttpContext, IRequestMethodProvider> _requestMethodProviderFactory;
        private readonly IFactory<ControllerActionDescriptor, IEndpointProvider> _endpointProvider;
        private readonly IUserToSService _userToSService;
        private readonly ICurrentSecurityUserProvider _currentSecurityUserProvider;

        public TermsOfServiceFilter(
            IFactory<HttpContext, IRequestMethodProvider> requestMethodProviderFactory,
            IUserToSService userToSService,
            ICurrentSecurityUserProvider currentSecurityUserProvider,
            IFactory<ControllerActionDescriptor, IEndpointProvider> endpointProvider)
        {
            _requestMethodProviderFactory = requestMethodProviderFactory;
            _currentSecurityUserProvider = currentSecurityUserProvider;
            _endpointProvider = endpointProvider;
            _userToSService = userToSService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var requestMethod = _requestMethodProviderFactory.Create(context.HttpContext);
            var endpoint = _endpointProvider.Create(context.ActionDescriptor as ControllerActionDescriptor);

            if (!requestMethod.IsOptionsRequest() && endpoint.IsProtected())
            {
                var securityUserId = await _currentSecurityUserProvider.GetSecurityUserIdAsync(context.HttpContext.User);

                var isAccepted = await _userToSService.IsAcceptedAsync(securityUserId);

                if (!isAccepted)
                {
                    context.Result = new BadRequestObjectResult("TOS_IS_NOT_ACCEPTED");

                    return;
                }
            }

            await next();
        }
    }
}
