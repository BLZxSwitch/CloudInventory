using Microsoft.AspNetCore.Identity;
using System;

namespace Api.Components.InviteUser
{
    public class InviteUserTokenProviderOptions : DataProtectionTokenProviderOptions
    {
        public InviteUserTokenProviderOptions()
        {
            Name = InviteUserTokenProviderName.Value;
            TokenLifespan = TimeSpan.FromDays(7);
        }
    }
}
