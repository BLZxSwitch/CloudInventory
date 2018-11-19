using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Moq;

namespace UnitTests.Components.Asserts
{
    public static class MockVerifyExtension
    {
        public static void VerifyContent<T>(this Mock<T> mock, Expression<Action<T>> expression, Times times)
            where T : class
        {
            var methodCallExpression = (MethodCallExpression) expression.Body;

            var parameters = new List<Expression>();

            foreach (var argument in methodCallExpression.Arguments)
            {
                if (IsItIsOrIsAny(argument))
                {
                    parameters.Add(argument);
                }
                else
                {
                    var argumentExpression = Expression.Lambda(argument);
                    var value = argumentExpression.Compile().DynamicInvoke(new object[0]);
                    parameters.Add(TransformToContentAssers(value));
                }
            }

            var callExpression = Expression.Call(methodCallExpression.Object, methodCallExpression.Method, parameters);
            var lambdaExpression = Expression.Lambda<Action<T>>(callExpression, expression.Parameters);
            mock.Verify(lambdaExpression, times);
        }

        public static void VerifyContent<T>(this Mock<T> mock, Expression<Action<T>> expression) where T : class
        {
            VerifyContent(mock, expression, Times.Once());
        }

        private static bool IsItIsOrIsAny(Expression argument)
        {
            bool passIteration = false;
            if (argument.NodeType == ExpressionType.Call)
            {
                var itIsMethodInfo = typeof(It).GetMethod("Is");
                var itIsAnyMethodInfo = typeof(It).GetMethod("IsAny");
                var callExpression = (MethodCallExpression) argument;
                if (callExpression.Method.IsGenericMethod)
                {
                    var genericMethodDefinition = callExpression.Method.GetGenericMethodDefinition();
                    if (genericMethodDefinition == itIsMethodInfo)
                        passIteration = true;
                    if (genericMethodDefinition == itIsAnyMethodInfo)
                        passIteration = true;
                }
            }

            return passIteration;
        }

        private static Expression TransformToContentAssers(object valueToCheck)
        {
            var checkType = valueToCheck.GetType();
            var itIsMethodInfo = typeof(It).GetMethod("Is").MakeGenericMethod(checkType);
            var contentComparerAreEqualMethodInfo = typeof(ContentComparer).GetMethod("AreEqual");

            var checkParam = Expression.Parameter(checkType, "toCheck");
            var castedCheckParam = Expression.Convert(checkParam, typeof(object));

            var contantValue = Expression.Constant(valueToCheck, typeof(Object));
            var compareCall = Expression.Call(contentComparerAreEqualMethodInfo, contantValue, castedCheckParam);

            var checkLambda = Expression.Lambda(compareCall, checkParam);
            var itCall = Expression.Call(itIsMethodInfo, checkLambda);
            return itCall;
        }
    }
}