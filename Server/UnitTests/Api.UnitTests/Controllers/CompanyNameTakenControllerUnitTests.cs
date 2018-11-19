using System.Threading.Tasks;
using Api.Components.CompanyNameIsTaken;
using Api.Controllers;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Api.UnitTests.Controllers
{
    [TestClass]
    public class CompanyNameTakenControllerUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _mock.Create<CompanyNameTakenController>();
        }

        [TestMethod]
        public async Task ReturnsCompanyNameIsTaken()
        {
            var companyName = "company name";
            var isTaken = true;

            _mock.Mock<ICompanyNameIsTakenProvider>()
                .Setup(provider => provider.IsTaken(companyName))
                .ReturnsAsync(isTaken);

            var controller = _mock.Create<CompanyNameTakenController>();
            var actual = await controller.IsTaken(companyName);

            Assert.AreEqual(isTaken, actual);
        }
    }
}