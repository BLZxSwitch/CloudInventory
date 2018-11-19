using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace UnitTests.Components.Extensions
{
    public class MockedDbAsyncEnumerable<T> : EnumerableQuery<T>, IAsyncEnumerable<T>, IQueryable<T>
    {
        public MockedDbAsyncEnumerable(IEnumerable<T> enumerable)
            : base(enumerable)
        {
        }

        public MockedDbAsyncEnumerable(Expression expression)
            : base(expression)
        {
        }

        public IAsyncEnumerator<T> GetEnumerator()
        {
            return GetAsyncEnumerator();
        }

        IQueryProvider IQueryable.Provider => new MockedAsyncQueryProvider<T>(this);

        public IAsyncEnumerator<T> GetAsyncEnumerator()
        {
            return new MockedDbAsyncEnumerator<T>(this.AsEnumerable().GetEnumerator());
        }
    }
}