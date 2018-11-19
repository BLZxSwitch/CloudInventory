using EF.Models.Models;
using System;
using System.Threading.Tasks;

namespace Api.Components.SecurityUsers
{
    public interface ISecurityUserProvider : IDisposable
    {
        Task<SecurityUser> GetByIdAsync(Guid securityUserId);

        Task<SecurityUser> GetByUserIdAsync(Guid userId);
    }
}