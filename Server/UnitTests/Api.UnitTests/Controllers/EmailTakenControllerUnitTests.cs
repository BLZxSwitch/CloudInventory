using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.EmailTaken;
using Api.Controllers;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class EmailTakenControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _mock.Create<EmailTakenController>();
        }

        [TestMethod]
        public async Task ReturnsEmailIsTaken()
        {
            var email = "m@m";
            var isTaken = true;

            _mock.Mock<IEmailIsTakenProvider>()
                .Setup(provider => provider.IsTaken(email))
                .ReturnsAsync(isTaken);

            var controller = _mock.Create<EmailTakenController>();
            var actual = await controller.IsTaken(email);

            Assert.AreEqual(isTaken, actual);
        }

        [TestMethod]
        public async Task WithSelfEmployeeIdReturnsEmailIsTaken()
        {
            var email = "m@m";
            var isTaken = true;
            var selfEmployeeId = Guid.NewGuid();

            _mock.Mock<IEmailIsTakenProvider>()
                .Setup(provider => provider.IsTaken(email, selfEmployeeId))
                .ReturnsAsync(isTaken);

            var controller = _mock.Create<EmailTakenController>();
            var actual = await controller.IsTaken(email, selfEmployeeId);

            Assert.AreEqual(isTaken, actual);
        }
    }
}