using Api.Components.Culture;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Components.Culture
{
    [TestClass]
    public class CultureInfoProviderUnitTests
    {
        [TestMethod]
        public void ShouldReturn_De_CultureInfo()
        {
            var cultureInfoProvider = new CultureInfoProvider();

            var actual = cultureInfoProvider.Get("de");

            Assert.AreEqual("de-DE", actual.Name);
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
