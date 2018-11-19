using System;
using KellermanSoftware.CompareNetObjects;

namespace UnitTests.Components.Asserts
{
    public static class ContentComparer
    {
        public static bool AreEqual(object first, object second)
        {
            var compareObjects = new CompareLogic();
            var areEqual = compareObjects.Compare(first, second);
            if (areEqual.AreEqual)
                return true;

            Console.WriteLine(areEqual.DifferencesString);
            return areEqual.AreEqual;
        }
    }
}