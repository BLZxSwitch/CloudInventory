using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace UnitTests.Components.Extensions
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> ToEnumerable<T>(this T instance)
        {
            return new[] {instance};
        }

        public static IQueryable<T> ToQueryable<T>(this T instance)
            where T : class
        {
            var dbSetMock = new Mock<DbSet<T>>();
            var queryable = new[] {instance}.AsQueryable();
            dbSetMock.SetupAsQueryable(queryable);
            return dbSetMock.Object;
        }

        public static ICollection<T> ToCollection<T>(this T instance)
        {
            return new List<T> {instance};
        }
    }
}