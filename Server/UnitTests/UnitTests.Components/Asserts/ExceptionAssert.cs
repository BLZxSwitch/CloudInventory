using System;
using System.Threading.Tasks;
using KellermanSoftware.CompareNetObjects;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTests.Components.Asserts
{
    public static class ExceptionAssert
    {
        public static T Throws<T>(Action testAction) where T : Exception
        {
            var actualException = GetException<T>(testAction);
            Assert.IsNotNull(actualException, "Expects an exception of type {0}, but it did not throw.", typeof(T));
            Assert.IsInstanceOfType(actualException, typeof(T),
                "Expects an exception of type {0}, but the actual exception is of type {1}.", typeof(T),
                actualException.GetType());
            return actualException;
        }

        public static T ThrowsAsync<T>(Func<Task> testAction) where T : Exception
        {
            var actualException = GetAsyncException<T>(testAction);
            Assert.IsNotNull(actualException, "Expects an exception of type {0}, but it did not throw.", typeof(T));
            Assert.IsInstanceOfType(actualException, typeof(T),
                "Expects an exception of type {0}, but the actual exception is of type {1}.", typeof(T),
                actualException.GetType());
            return actualException;
        }

        public static void ThrowsAsync<T>(T expected, Func<Task> testAction)
            where T : Exception
        {
            var actualException = GetAsyncException<Exception>(testAction);
            var comparisonConfig = new ComparisonConfig
            {
                MembersToIgnore =
                {
                    nameof(Exception.StackTrace),
                    nameof(Exception.TargetSite),
                    nameof(Exception.Source)
                }
            };
            var compareObjects = new CompareLogic(comparisonConfig);
            var comparisonResult = compareObjects.Compare(expected, actualException);

            if (comparisonResult.AreEqual)
                return;

            throw new AssertFailedException(string.Format("{0}.", comparisonResult.DifferencesString));
        }

        private static T GetException<T>(Action testAction) where T : Exception
        {
            try
            {
                testAction();
            }
            catch (Exception ex)
            {
                return ex as T;
            }

            Assert.Fail("Action did not raise any exceptions");
            return null;
        }

        private static T GetAsyncException<T>(Func<Task> testAction) where T : Exception
        {
            try
            {
                testAction().Wait();
            }
            catch (AggregateException ex)
            {
                return ex.InnerException as T;
            }

            Assert.Fail("Action did not raise any exceptions");
            return null;
        }
    }
}