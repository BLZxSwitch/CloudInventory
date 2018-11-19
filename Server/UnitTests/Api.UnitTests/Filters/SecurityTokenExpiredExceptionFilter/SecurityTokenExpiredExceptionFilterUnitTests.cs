using System;
using System.Collections.Generic;
using Api.Common.Exceptions;
using Api.Components.ExceptionContext;
using Api.Components.Factories;
using Autofac.Extras.Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Routing;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using UnitTests.Components.Asserts;
using ExceptionContext = Microsoft.AspNetCore.Mvc.Filters.ExceptionContext;

namespace Api.UnitTests.Filters.SecurityTokenExpiredExceptionFilter
{
    [TestClass]
    public class SecurityTokenExpiredExceptionFilterUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public void SetsBadRequestResultWhenActionThrowsSecurityTokenExpiredException()
        {
            const string message = "INVALID_OTP_TOKEN";
            var exceptionContext = ConstractExceptionContext();
            
            _mock.Mock<IFactory<ExceptionContext, IExceptionContext>>()
                .Setup(factory => factory.Create(exceptionContext))
                .Returns(_mock.Mock<IExceptionContext>().Object);

            _mock.Mock<IExceptionContext>()
                .Setup(context => context.Exception)
                .Returns(new SecurityTokenExpiredException(message));

            var filter = _mock.Create<Api.Filters.SecurityTokenExpiredExceptionFilter.SecurityTokenExpiredExceptionFilter>();
            filter.OnException(exceptionContext);

            _mock.Mock<IExceptionContext>()
                .VerifyContent(context => context.SetResult(new BadRequestObjectResult(message)));
            _mock.Mock<IExceptionContext>()
                .VerifyContent(context => context.ResetException());
        }        
        
        [TestMethod]
        public void IgnoresAllOtherExceptoinsFromActions()
        {
            var exceptionContext = ConstractExceptionContext();
            
            _mock.Mock<IFactory<ExceptionContext, IExceptionContext>>()
                .Setup(factory => factory.Create(exceptionContext))
                .Returns(_mock.Mock<IExceptionContext>().Object);

            _mock.Mock<IExceptionContext>()
                .Setup(context => context.Exception)
                .Returns(new Exception());

            var filter = _mock.Create<Api.Filters.SecurityTokenExpiredExceptionFilter.SecurityTokenExpiredExceptionFilter>();
            filter.OnException(exceptionContext);

            _mock.Mock<IExceptionContext>()
                .VerifyContent(context => context.SetResult(It.IsAny<BadRequestObjectResult>()), Times.Never());
            _mock.Mock<IExceptionContext>()
                .VerifyContent(context => context.ResetException(), Times.Never());
        }

        private static ExceptionContext ConstractExceptionContext()
        {
            var actionContext = new ActionContext(
                new Mock<HttpContext>().Object,
                new RouteData(),
                new Mock<ControllerActionDescriptor>().Object,
                new Mock<ModelStateDictionary>().Object);

            var exceptionContext = new ExceptionContext(
                actionContext,
                new List<IFilterMetadata>());

            return exceptionContext;
        }
    }
}