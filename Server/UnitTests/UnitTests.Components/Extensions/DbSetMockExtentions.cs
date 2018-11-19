using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.Language;
using Moq.Language.Flow;

namespace UnitTests.Components.Extensions
{
    public static class DbSetMockExtentions
    {
        public static Mock<DbSet<TEntity>> SetupAsQueryable<TEntity>(this Mock<DbSet<TEntity>> dbSetMock,
            IQueryable<TEntity> collection)
            where TEntity : class
        {
            dbSetMock.As<IAsyncEnumerable<TEntity>>()
                .Setup(m => m.GetEnumerator())
                .Returns(new MockedDbAsyncEnumerator<TEntity>(collection.GetEnumerator()));

            dbSetMock.As<IQueryable<TEntity>>()
                .Setup(m => m.Provider)
                .Returns(new MockedAsyncQueryProvider<TEntity>(collection.Provider));

            dbSetMock.As<IQueryable<TEntity>>().Setup(m => m.Expression).Returns(collection.Expression);
            dbSetMock.As<IQueryable<TEntity>>().Setup(m => m.ElementType).Returns(collection.ElementType);
            dbSetMock.As<IQueryable<TEntity>>().Setup(m => m.GetEnumerator()).Returns(collection.GetEnumerator());
            return dbSetMock;
        }

        public static Mock<DbSet<TItem>> ReturnsAsDbSet<T, TItem>(this ISetup<T, DbSet<TItem>> setup, TItem instance)
            where T : class
            where TItem : class
        {
            var queryable = instance.ToQueryable();
            var mock = new Mock<DbSet<TItem>>();
            mock.SetupAsQueryable(queryable);
            setup.Returns(mock.Object);
            return mock;
        }

        public static Mock<DbSet<TItem>> ReturnsAsDbSet<T, TItem>(this ISetup<T, DbSet<TItem>> setup,
            IEnumerable<TItem> collection)
            where T : class
            where TItem : class
        {
            var queryable = collection.AsQueryable();
            var mock = new Mock<DbSet<TItem>>();
            mock.SetupAsQueryable(queryable);

            if (collection is IList<TItem> list)
            {
                mock.Setup(set => set.Add(It.IsAny<TItem>())).Callback((TItem item) => list.Add(item));
                mock.Setup(set => set.Remove(It.IsAny<TItem>())).Callback((TItem item) => list.Remove(item));
            }

            setup.Returns(mock.Object);
            return mock;
        }

        public static Mock<DbSet<TItem>> ReturnsAsEmptyDbSet<T, TItem>(this ISetup<T, DbSet<TItem>> setup)
            where T : class
            where TItem : class
        {
            var mock = new Mock<DbSet<TItem>>();
            var collection = new List<TItem>().AsQueryable();
            mock.SetupAsQueryable(collection);
            setup.Returns(mock.Object);
            return mock;
        }

        public static IReturnsResult<TMock> ReturnsAsEmptyDbSetAsync<TMock, TItem>(
            this IReturns<TMock, Task<IQueryable<TItem>>> mock)
            where TMock : class
            where TItem : class
        {
            var dbSetMock = new Mock<DbSet<TItem>>();
            var collection = new List<TItem>().AsQueryable();
            dbSetMock.SetupAsQueryable(collection);

            var completionSource = new TaskCompletionSource<IQueryable<TItem>>();
            completionSource.SetResult(dbSetMock.Object);
            return mock.Returns(completionSource.Task);
        }
    }
}