using Api.Components.Factories;
using Api.Components.Jwt.RenewAccessTokenService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Filters.RenewAccessToken
{
    public class RenewAccessTokenFilter : ActionFilterAttribute
    {
        private readonly IFactory<HttpContext, IAuthorizationHeaderAsBearerTokenProvider>
            _authorizationHeaderValueProviderFactory;
        
        private readonly IRenewAccessTokenService _renewAccessTokenService;
        private readonly IFactory<HttpContext, IRequestMethodProvider> _requestMethodProviderFactory;
        private readonly IFactory<HttpContext, ISetRenewedTokenHeaderService> _setRenewedTokenHeaderServiceFactory;
        private readonly IFactory<ControllerActionDescriptor, IEndpointProvider> _endpointProvider;

        public RenewAccessTokenFilter(
            IFactory<HttpContext, IRequestMethodProvider> requestMethodProviderFactory,
            IFactory<HttpContext, IAuthorizationHeaderAsBearerTokenProvider> authorizationHeaderValueProviderFactory,
            IFactory<HttpContext, ISetRenewedTokenHeaderService> setRenewedTokenHeaderServiceFactory,
            IFactory<ControllerActionDescriptor, IEndpointProvider> endpointProvider,
            IRenewAccessTokenService renewAccessTokenService)
        {
            _requestMethodProviderFactory = requestMethodProviderFactory;
            _authorizationHeaderValueProviderFactory = authorizationHeaderValueProviderFactory;
            _setRenewedTokenHeaderServiceFactory = setRenewedTokenHeaderServiceFactory;
            _renewAccessTokenService = renewAccessTokenService;
            _endpointProvider = endpointProvider;
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var requestMethod = _requestMethodProviderFactory.Create(context.HttpContext);
            var endpoint = _endpointProvider.Create(context.ActionDescriptor as ControllerActionDescriptor);
            var authorizationHeaderValueProvider = _authorizationHeaderValueProviderFactory.Create(context.HttpContext);
            var setRenewedTokenHeaderService = _setRenewedTokenHeaderServiceFactory.Create(context.HttpContext);

            if (!requestMethod.IsOptionsRequest() && endpoint.IsProtected())
            {
                var outdatedToken = authorizationHeaderValueProvider.AsBearerToken();
                var renewedToken = _renewAccessTokenService.Renew(outdatedToken);
                setRenewedTokenHeaderService.SetValue(renewedToken);
            }

            base.OnActionExecuted(context);
        }
    }
}
