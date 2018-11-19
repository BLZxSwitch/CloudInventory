using System.Collections.Generic;
using Api.Components.Factories;
using Api.Components.Jwt.RenewAccessTokenService;
using Api.Filters.RenewAccessToken;
using Autofac.Extras.Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Filters.RenewAccessToken
{
    [TestClass]
    public class RenewAccessTokenFilterUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void RenewsToken()
        {
            const string authorizationHeaderValue = "outdated token";
            const string renewedToken = "renewed token";
            var actionExecutedContext = GetActionExecutedContext();
            var httpContext = actionExecutedContext.HttpContext;

            _mock.Mock<IFactory<HttpContext, IAuthorizationHeaderAsBearerTokenProvider>>()
                .Setup(factory => factory.Create(httpContext))
                .Returns(_mock.Mock<IAuthorizationHeaderAsBearerTokenProvider>().Object);

            _mock.Mock<IFactory<HttpContext, IRequestMethodProvider>>()
                .Setup(factory => factory.Create(httpContext))
                .Returns(_mock.Mock<IRequestMethodProvider>().Object);

            _mock.Mock<IFactory<HttpContext, ISetRenewedTokenHeaderService>>()
                .Setup(factory => factory.Create(httpContext))
                .Returns(_mock.Mock<ISetRenewedTokenHeaderService>().Object);

            _mock.Mock<IFactory<ControllerActionDescriptor, IEndpointProvider>>()
                .Setup(factory => factory.Create(actionExecutedContext.ActionDescriptor as ControllerActionDescriptor))
                .Returns(_mock.Mock<IEndpointProvider>().Object);

            _mock.Mock<IAuthorizationHeaderAsBearerTokenProvider>()
                .Setup(context => context.AsBearerToken())
                .Returns(authorizationHeaderValue);

            _mock.Mock<IEndpointProvider>()
                .Setup(context => context.IsProtected())
                .Returns(true);

            _mock.Mock<IRequestMethodProvider>()
                .Setup(context => context.IsOptionsRequest())
                .Returns(false);

            _mock.Mock<IRenewAccessTokenService>()
                .Setup(service => service.Renew(authorizationHeaderValue))
                .Returns(renewedToken);
            
            var filter = _mock.Create<RenewAccessTokenFilter>();
            filter.OnActionExecuted(actionExecutedContext);

            _mock.Mock<ISetRenewedTokenHeaderService>()
                .Verify(context => context.SetValue(renewedToken));
        }

        [TestMethod]
        public void DoesNotRenewTokenForOptionsRequest()
        {
            var actionExecutedContext = GetActionExecutedContext();
            var httpContext = actionExecutedContext.HttpContext;

            _mock.Mock<IFactory<HttpContext, IRequestMethodProvider>>()
                .Setup(factory => factory.Create(httpContext))
                .Returns(_mock.Mock<IRequestMethodProvider>().Object);

            _mock.Mock<IRequestMethodProvider>()
                .Setup(context => context.IsOptionsRequest())
                .Returns(true);

            var filter = _mock.Create<RenewAccessTokenFilter>();
            filter.OnActionExecuted(actionExecutedContext);

            _mock.Mock<ISetRenewedTokenHeaderService>()
                .Verify(context => context.SetValue(It.IsAny<string>()), Times.Never);
        }

        [TestMethod]
        public void DoesNotRenewTokenForNotProtectedEndpoint()
        {
            var actionExecutedContext = GetActionExecutedContext();
            var httpContext = actionExecutedContext.HttpContext;

            _mock.Mock<IFactory<HttpContext, IRequestMethodProvider>>()
                .Setup(factory => factory.Create(httpContext))
                .Returns(_mock.Mock<IRequestMethodProvider>().Object);

            _mock.Mock<IFactory<ControllerActionDescriptor, IEndpointProvider>>()
                .Setup(factory => factory.Create(actionExecutedContext.ActionDescriptor as ControllerActionDescriptor))
                .Returns(_mock.Mock<IEndpointProvider>().Object);

            _mock.Mock<IRequestMethodProvider>()
                .Setup(context => context.IsOptionsRequest())
                .Returns(false);

            _mock.Mock<IEndpointProvider>()
                .Setup(context => context.IsProtected())
                .Returns(false);

            var filter = _mock.Create<RenewAccessTokenFilter>();
            filter.OnActionExecuted(actionExecutedContext);

            _mock.Mock<ISetRenewedTokenHeaderService>()
                .Verify(context => context.SetValue(It.IsAny<string>()), Times.Never);
        }

        private ActionExecutedContext GetActionExecutedContext()
        {
            var controllerActionDescriptor = _mock.Mock<ControllerActionDescriptor>().Object;

            var actionContext = new ActionContext(
                                _mock.Mock<HttpContext>().Object,
                                new RouteData(),
                                controllerActionDescriptor);

            return new ActionExecutedContext(
                actionContext,
                filters: new List<IFilterMetadata>(),
                controller: new object());
        }
    }
}