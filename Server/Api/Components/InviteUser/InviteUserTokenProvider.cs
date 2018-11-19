using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Api.Components.InviteUser
{
    public class InviteUserTokenProvider<TUser> : DataProtectorTokenProvider<TUser> where TUser : class
    {
        public InviteUserTokenProvider(
            IDataProtectionProvider dataProtectionProvider,
            IOptions<InviteUserTokenProviderOptions> options)
            : base(dataProtectionProvider, options)
        {
        }
    }
}
