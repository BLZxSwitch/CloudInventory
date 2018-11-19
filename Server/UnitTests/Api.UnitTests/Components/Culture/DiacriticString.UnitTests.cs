using Api.Components.Culture;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Components.Culture
{
    [TestClass]
    public class DiacriticString
    {
        [TestMethod]
        public void RemovesDiactrictSign()
        {
            var actual = "äöüÄÖÜ".RemoveDiacritics();
            Assert.AreEqual("aouAOU", actual);
        }
    }
}
