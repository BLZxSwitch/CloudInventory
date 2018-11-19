using Microsoft.AspNetCore.Identity;

namespace Api.Components.InviteUser
{
    public static class InviteUserTokenProviderExtension
    {
        public static IdentityBuilder AddInviteUserTokenProvider(this IdentityBuilder builder)
        {
            var userType = builder.UserType;
            var inviteUserTokenProvider = typeof(InviteUserTokenProvider<>).MakeGenericType(userType);
            return builder.AddTokenProvider(InviteUserTokenProviderName.Value, inviteUserTokenProvider);
        }
    }
}
