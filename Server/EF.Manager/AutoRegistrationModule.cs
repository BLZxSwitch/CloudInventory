using Autofac;
using Autofac.Extras.RegistrationAttributes;

namespace EF.Manager
{
    public class AutoRegistrationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.AutoRegistration(GetType().Assembly);
            builder.RegisterModule<Models.AutoRegistrationModule>();
        }
    }
}