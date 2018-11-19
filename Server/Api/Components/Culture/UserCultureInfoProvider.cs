using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using System.Globalization;

namespace Api.Components.Culture
{
    [As(typeof(IUserCultureInfoProvider))]
    public class UserCultureInfoProvider: IUserCultureInfoProvider
    {
        private readonly ICultureInfoProvider _cultureInfoProvider;

        public UserCultureInfoProvider(
            ICultureInfoProvider cultureInfoProvider)
        {
            _cultureInfoProvider = cultureInfoProvider;
        }

        public CultureInfo Get(SecurityUser securityUser)
        {
            return _cultureInfoProvider.Get(securityUser.CultureName);
        }
    }
}