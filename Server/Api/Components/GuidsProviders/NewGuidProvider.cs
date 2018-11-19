using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.GuidsProviders
{
    [As(typeof(INewGuidProvider))]
    [SingleInstance]
    internal class NewGuidProvider : INewGuidProvider
    {
        public System.Guid Get()
        {
            return System.Guid.NewGuid();
        }
    }
}