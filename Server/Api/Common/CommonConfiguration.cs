using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Common
{
    [As(typeof(ICommonConfiguration))]
    public class CommonConfiguration : ICommonConfiguration
    {
        public string ClientBaseUrl { get; set; }
    }
}
