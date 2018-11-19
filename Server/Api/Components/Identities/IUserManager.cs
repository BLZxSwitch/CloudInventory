using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using EF.Models.Models;
using Microsoft.AspNetCore.Identity;

namespace Api.Components.Identities
{
    public interface IUserManager : IDisposable
    {
        Task<IdentityResult> CreateAsync(User user);
        Task<IdentityResult> CreateAsync(User user, string password);
        Task<User> FindByEmailAsync(string email);
        Task<bool> CheckPasswordAsync(User user, string password);
        Guid GetUserId(ClaimsPrincipal principal);
        Task<string> GenerateInviteUserTokenAsync(User user);
        Task<string> GeneratePasswordResetTokenAsync(User user);
        Task<IdentityResult> ResetPasswordAsync(User user, string token, string newPassword);
        Task<User> FindByIdAsync(Guid userId);
        Task<IList<string>> GetRolesAsync(User user);
        Task<IdentityResult> SetPassworForInvitationdAsync(User user, string token, string newPassword);
        Task<IdentityResult> DeleteAsync(User user);
    }
}
