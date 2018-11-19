using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Api.Components.SecurityUsers
{
    [As(typeof(ISecurityUserProvider))]
    public class SecurityUserProvider : ISecurityUserProvider
    {
        private readonly IInventContext _inventContext;

        public SecurityUserProvider(IInventContext inventContext)
        {
            _inventContext = inventContext;
        }

        public void Dispose()
        {
            _inventContext.Dispose();
        }

        public async Task<SecurityUser> GetByIdAsync(Guid securityUserId)
        {
            return await _inventContext.SecurityUsers.SingleAsync(su => su.Id == securityUserId);
        }

        public async Task<SecurityUser> GetByUserIdAsync(Guid userId)
        {
            return await _inventContext.SecurityUsers.SingleAsync(su => su.UserId == userId);
        }
    }
}
