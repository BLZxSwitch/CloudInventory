using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace UnitTests.Components.Extensions
{
    public class MockedDbAsyncEnumerator<T> : IAsyncEnumerator<T>
    {
        private readonly IEnumerator<T> _innerEnumerator;
        private bool _disposed;

        public MockedDbAsyncEnumerator(IEnumerator<T> enumerator)
        {
            _innerEnumerator = enumerator;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public Task<bool> MoveNext(CancellationToken cancellationToken)
        {
            return Task.FromResult(_innerEnumerator.MoveNext());
        }

        public T Current => _innerEnumerator.Current;

        protected virtual void Dispose(bool disposing)
        {
            if (_disposed) return;
            if (disposing) _innerEnumerator.Dispose();

            _disposed = true;
        }
    }
}