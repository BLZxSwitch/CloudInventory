using Api.Components.Dashboard;
using Api.Controllers;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Security.Claims;
using System.Threading.Tasks;
using UnitTests.Components.Asserts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class DashboardControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
        }

        [TestMethod]
        public async Task ShouldReturnDashboardSummaryResponse()
        {
            var claimsPrincipal = new ClaimsPrincipal();

            var controllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = claimsPrincipal
                }
            };

            var expected = new DashboardSummaryResponse();
            
            var controller = _mock.Create<DashboardController>();
            controller.ControllerContext = controllerContext;
            
            _mock.Mock<IDashboardService>()
                .Setup(service => service.GetSummaryAsync(controller.User))
                .ReturnsAsync(expected);

            var actual = await controller.GetSummary();

            ContentAssert.AreEqual(expected, actual);
        }
    }
}