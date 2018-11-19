using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using System;

namespace Api.Components.Culture
{
    [As(typeof(IUserDateStringProvider))]
    public class UserDateStringProvider : IUserDateStringProvider
    {
        private readonly IUserCultureInfoProvider _userCultureInfoProvider;

        public UserDateStringProvider(
            IUserCultureInfoProvider userCultureInfoProvider)
        {
            _userCultureInfoProvider = userCultureInfoProvider;
        }

        public string Get(SecurityUser securityUser, DateTime date)
        {
            var cultureInfo = _userCultureInfoProvider.Get(securityUser);
            string format = cultureInfo.DateTimeFormat.ShortDatePattern;

            return date.ToString(format, cultureInfo);
        }
    }
}