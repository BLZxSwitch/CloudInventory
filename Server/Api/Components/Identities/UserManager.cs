using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Components.InviteUser;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Api.Components.Identities
{
    [As(typeof(IUserManager))]
    public class UserManager : UserManager<User>, IUserManager
    {
        public UserManager(
            IUserStore<User> store,
            IOptions<IdentityOptions> optionsAccessor,
            IPasswordHasher<User> passwordHasher,
            IEnumerable<IUserValidator<User>> userValidators,
            IEnumerable<IPasswordValidator<User>> passwordValidators,
            ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors,
            IServiceProvider services,
            ILogger<UserManager<User>> logger)
            : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors,
                services, logger)
        {
        }

        public new Guid GetUserId(ClaimsPrincipal principal)
        {
            var userId = base.GetUserId(principal);
            return Guid.Parse(userId);
        }

        public async Task<User> FindByIdAsync(Guid userId)
        {
            return await Users
                .Include(u => u.SecurityUser)
                .SingleAsync(u => u.Id == userId);
        }

        public async Task<string> GenerateInviteUserTokenAsync(User user)
        {
            ThrowIfDisposed();
            return await GenerateUserTokenAsync(user, InviteUserTokenProviderName.Value, "InviteUser");
        }

        public async Task<IdentityResult> SetPassworForInvitationdAsync(User user, string token, string newPassword)
        {
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            // Make sure the token is valid and the stamp matches
            if (!await VerifyUserTokenAsync(user, InviteUserTokenProviderName.Value, "InviteUser", token))
            {
                return IdentityResult.Failed(ErrorDescriber.InvalidToken());
            }
            var result = await UpdatePasswordHash(user, newPassword, validatePassword: true);
            if (!result.Succeeded)
            {
                return result;
            }
            return await UpdateUserAsync(user);
        }
    }
}