using EF.Models.Models;
using Microsoft.Extensions.Localization;

namespace Api.Components.Culture
{
    public interface IUserLocalizerProvider
    {
        IStringLocalizer Get(SecurityUser securityUser);
        IStringLocalizer Get();
    }

    public interface IUserLocalizerProvider<T> : IUserLocalizerProvider
    {
    }
}