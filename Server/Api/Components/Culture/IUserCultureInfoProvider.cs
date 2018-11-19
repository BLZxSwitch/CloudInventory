using EF.Models.Models;
using System.Globalization;

namespace Api.Components.Culture
{
    public interface IUserCultureInfoProvider
    {
        CultureInfo Get(SecurityUser securityUser);
    }
}