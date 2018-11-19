using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;
using Microsoft.Extensions.Localization;

namespace Api.Components.Culture
{
    [As(typeof(IUserLocalizerProvider<>))]
    public class UserLocalizerProvider<T>: IUserLocalizerProvider<T>
    {
        private readonly IStringLocalizer<T> _localizer;
        private readonly ICultureInfoProvider _cultureInfoProvider;

        public UserLocalizerProvider(
            IStringLocalizer<T> localizer,
            ICultureInfoProvider cultureInfoProvider)
        {
            _localizer = localizer;
            _cultureInfoProvider = cultureInfoProvider;
        }

        public IStringLocalizer Get(SecurityUser securityUser)
        {
            var culture = _cultureInfoProvider.Get(securityUser.CultureName);
            return _localizer.WithCulture(culture);
        }

        public IStringLocalizer Get()
        {
            return _localizer;
        }
    }
}