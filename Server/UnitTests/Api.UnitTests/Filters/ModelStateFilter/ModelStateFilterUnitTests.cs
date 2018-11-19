using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Components.ActionExecutingContext;
using Api.Components.Factories;
using Autofac.Extras.Moq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Routing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using UnitTests.Components.Asserts;
using ActionExecutingContext = Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext;

namespace Api.UnitTests.Filters.ModelStateFilter
{
    [TestClass]
    public class ModelStateFilterUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task SetsBadRequestResultWhenModelIsInvalid()
        {
            var actionExecutedContext = ConstractActionExecutingContext();
            _mock.Mock<IFactory<ActionExecutingContext, IActionExecutingContext>>()
                .Setup(factory => factory.Create(actionExecutedContext))
                .Returns(_mock.Mock<IActionExecutingContext>().Object);

            _mock.Mock<IActionExecutingContext>()
                .Setup(context => context.IsModelValid)
                .Returns(false);

            _mock.Mock<IHostingEnvironment>()
                .Setup(environment => environment.EnvironmentName)
                .Returns(EnvironmentName.Production);

            var nextActionMock = new Mock<ActionExecutionDelegate>();

            var filter = _mock.Create<Api.Filters.ModelStateFilter.ModelStateFilter>();
            await filter.OnActionExecutionAsync(actionExecutedContext, nextActionMock.Object);

            _mock.Mock<IActionExecutingContext>()
                .VerifyContent(context => context.SetResult(new BadRequestResult()));
            nextActionMock
                .Verify(@delegate => @delegate(), Times.Never());
        }        
        
        [TestMethod]
        public async Task SetsBadRequestObjectResultWhenModelIsInvalidInDevelopmentMode()
        {
            var actionExecutedContext = ConstractActionExecutingContext();
            _mock.Mock<IFactory<ActionExecutingContext, IActionExecutingContext>>()
                .Setup(factory => factory.Create(actionExecutedContext))
                .Returns(_mock.Mock<IActionExecutingContext>().Object);

            _mock.Mock<IActionExecutingContext>()
                .Setup(context => context.IsModelValid)
                .Returns(false);

            var modelStateDictionary = new Mock<ModelStateDictionary>()
                .Object;
            
            _mock.Mock<IActionExecutingContext>()
                .Setup(context => context.ModelState)
                .Returns(modelStateDictionary);

            _mock.Mock<IHostingEnvironment>()
                .Setup(environment => environment.EnvironmentName)
                .Returns(EnvironmentName.Development);

            var nextActionMock = new Mock<ActionExecutionDelegate>();

            var filter = _mock.Create<Api.Filters.ModelStateFilter.ModelStateFilter>();
            await filter.OnActionExecutionAsync(actionExecutedContext, nextActionMock.Object);

            _mock.Mock<IActionExecutingContext>()
                .VerifyContent(context => context.SetResult(new BadRequestObjectResult(modelStateDictionary)));
            nextActionMock
                .Verify(@delegate => @delegate(), Times.Never());
        }
        
        [TestMethod]
        public async Task InvokesNextActionWhenModelIsValid()
        {
            var actionExecutedContext = ConstractActionExecutingContext();
            _mock.Mock<IFactory<ActionExecutingContext, IActionExecutingContext>>()
                .Setup(factory => factory.Create(actionExecutedContext))
                .Returns(_mock.Mock<IActionExecutingContext>().Object);

            _mock.Mock<IActionExecutingContext>()
                .Setup(context => context.IsModelValid)
                .Returns(true);

            var nextActionMock = new Mock<ActionExecutionDelegate>();

            var filter = _mock.Create<Api.Filters.ModelStateFilter.ModelStateFilter>();
            await filter.OnActionExecutionAsync(actionExecutedContext, nextActionMock.Object);

            _mock.Mock<IActionExecutingContext>()
                .Verify(context => context.SetResult(It.Is<IActionResult>(result => true)), Times.Never());
            nextActionMock
                .Verify(@delegate => @delegate());
        }

        private static ActionExecutingContext ConstractActionExecutingContext()
        {
            var actionContext = new ActionContext(
                new Mock<HttpContext>().Object,
                new RouteData(),
                new Mock<ControllerActionDescriptor>().Object,
                new Mock<ModelStateDictionary>().Object);

            var actionExecutedContext = new ActionExecutingContext(
                actionContext,
                new List<IFilterMetadata>(),
                new Dictionary<string, object>(),
                new object());

            return actionExecutedContext;
        }
    }
}