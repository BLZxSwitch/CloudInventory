using System.Globalization;

namespace Api.Components.Culture
{
    public interface ICultureInfoProvider
    {
        CultureInfo Get(string cultureName);
    }
}