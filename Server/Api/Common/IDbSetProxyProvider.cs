using Microsoft.EntityFrameworkCore;

namespace Api.Common
{
    public interface IDbSetProxyProvider
    {
        TEntity Create<TEntity>(DbSet<TEntity> dbSet) where TEntity : class;
    }
}
