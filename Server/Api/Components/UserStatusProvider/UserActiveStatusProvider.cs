using System;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Components.UserStatusProvider
{
    [As(typeof(IUserActiveStatusProvider))]
    class UserActiveStatusProvider : IUserActiveStatusProvider
    {
        private readonly Func<IInventContext> _contextFactory;

        public UserActiveStatusProvider(Func<IInventContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<bool> IsActiveAsync(Guid userId)
        {
            using (var context = _contextFactory())
            {
                var user = await context.Users.SingleAsync(u => u.Id == userId);
                return user.SecurityUser.IsActive;
            }
        }
    }
}