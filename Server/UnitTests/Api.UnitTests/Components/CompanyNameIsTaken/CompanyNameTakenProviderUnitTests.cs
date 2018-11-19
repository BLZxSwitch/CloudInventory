using System.Threading.Tasks;
using Api.Components.CompanyNameIsTaken;
using Autofac.Extras.Moq;
using EF.Models;
using EF.Models.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTests.Components.Extensions;

namespace Api.UnitTests.Components.CompanyNameIsTaken
{
    [TestClass]
    public class CompanyNameTakenProviderUnitTests
    {
        private AutoMock _mock;

        [TestInitialize]
        public void TestInitialize()
        {
            _mock = AutoMock.GetLoose();
            _mock.Create<CompanyNameIsTakenProvider>();
        }

        [TestMethod]
        public async Task ReturnsFalseWhenCompanyNameIsNotTaken()
        {
            var companyName = "company name";

            _mock.Mock<IInventContext>()
                .Setup(context => context.Companies)
                .ReturnsAsEmptyDbSet();

            var provider = _mock.Create<CompanyNameIsTakenProvider>();
            var actual = await provider.IsTaken(companyName);

            Assert.IsFalse(actual);
        }

        [TestMethod]
        public async Task ReturnsTrueWhenCompanyNameIsTaken()
        {
            var companyName = "company name";

            var company = new Company
            {
                Name = companyName
            };

            _mock.Mock<IInventContext>()
                .Setup(context => context.Companies)
                .ReturnsAsDbSet(company);

            var provider = _mock.Create<CompanyNameIsTakenProvider>();
            var actual = await provider.IsTaken(companyName);

            Assert.IsTrue(actual);
        }
    }
}