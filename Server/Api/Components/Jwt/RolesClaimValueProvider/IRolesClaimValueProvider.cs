using System.Collections.Generic;

namespace Api.Components.Jwt.RolesClaimValueProvider
{
    public interface IRolesClaimValueProvider
    {
        IList<string> GetValue();
    }
}
