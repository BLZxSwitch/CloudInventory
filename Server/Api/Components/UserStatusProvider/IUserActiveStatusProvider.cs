using System;
using System.Threading.Tasks;

namespace Api.Components.UserStatusProvider
{
    public interface IUserActiveStatusProvider
    {
        Task<bool> IsActiveAsync(Guid userId);
    }
}