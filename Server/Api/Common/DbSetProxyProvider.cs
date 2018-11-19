using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.EntityFrameworkCore;

namespace Api.Common
{
    [As(typeof(IDbSetProxyProvider))]
    public class DbSetProxyProvider : IDbSetProxyProvider
    {
        public TEntity Create<TEntity>(DbSet<TEntity> dbSet) where TEntity : class
        {
            return dbSet.CreateProxy();
        }
    }
}
