using Api.Components.Culture;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Components.Culture
{
    [TestClass]
    public class CultureInfoProviderUnitTests
    {
        [TestMethod]
        public void ShouldReturn_Ru_CultureInfo()
        {
            var cultureInfoProvider = new CultureInfoProvider();

            var actual = cultureInfoProvider.Get("ru");

            Assert.AreEqual("ru-RU", actual.Name);
        }

        [TestMethod]
        public void ShouldReturn_En_CultureInfo()
        {
            var cultureInfoProvider = new CultureInfoProvider();

            var actual = cultureInfoProvider.Get("en");

            Assert.AreEqual("en-US", actual.Name);
        }
    }
}
