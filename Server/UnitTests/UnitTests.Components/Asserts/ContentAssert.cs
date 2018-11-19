using KellermanSoftware.CompareNetObjects;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTests.Components.Asserts
{
    public static class ContentAssert
    {
        public static void AreEqual(object expected, object actual, string errorMessage = null)
        {
            var compareObjects = new CompareLogic(new ComparisonConfig()
            {
                //IgnoreCollectionOrder = true,
            });

            var comparisonResult = compareObjects.Compare(expected, actual);

            if (comparisonResult.AreEqual)
                return;

            throw new AssertFailedException(string.Format("{0}.\n {1}", comparisonResult.DifferencesString,
                errorMessage));
        }

        public static bool IsEqual(object expected, object actual)
        {
            return IsEqual(expected, actual, null);
        }

        public static bool IsEqual(object expected, object actual, string errorMessage)
        {
            var compareObjects = new CompareLogic(new ComparisonConfig());

            var comparisonResult = compareObjects.Compare(expected, actual);

            if (comparisonResult.AreEqual)
                return true;

            throw new AssertFailedException(string.Format("{0}.\n {1}", comparisonResult.DifferencesString,
                errorMessage));
        }
    }
}