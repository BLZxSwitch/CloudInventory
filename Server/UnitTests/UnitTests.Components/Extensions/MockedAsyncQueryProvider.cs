using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace UnitTests.Components.Extensions
{
    public class MockedAsyncQueryProvider<TEntity> : IAsyncQueryProvider
    {
        private readonly IQueryProvider _queryProvider;

        public MockedAsyncQueryProvider(IQueryProvider queryProvider)
        {
            _queryProvider = queryProvider;
        }

        public IQueryable CreateQuery(Expression expression)
        {
            switch (expression)
            {
                case MethodCallExpression m:
                    {
                        var resultType = m.Method.ReturnType;
                        var tElement = resultType.GetGenericArguments()[0];
                        var queryType = typeof(MockedDbAsyncEnumerable<>).MakeGenericType(tElement);
                        return (IQueryable)Activator.CreateInstance(queryType, expression);
                    }
            }
            return new MockedDbAsyncEnumerable<TEntity>(expression);
        }

        public IQueryable<TElement> CreateQuery<TElement>(Expression expression)
        {
            return new MockedDbAsyncEnumerable<TElement>(expression);
        }

        public object Execute(Expression expression)
        {
            return _queryProvider.Execute(expression);
        }

        public TResult Execute<TResult>(Expression expression)
        {
            return _queryProvider.Execute<TResult>(expression);
        }

        public IAsyncEnumerable<TResult> ExecuteAsync<TResult>(Expression expression)
        {
            return Task.FromResult(Execute<TResult>(expression)).ToAsyncEnumerable();
        }

        public Task<TResult> ExecuteAsync<TResult>(Expression expression, CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute<TResult>(expression));
        }

        public Task<object> ExecuteAsync(Expression expression, CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute(expression));
        }
    }
}