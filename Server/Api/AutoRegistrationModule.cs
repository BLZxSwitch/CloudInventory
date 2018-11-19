using Autofac;
using Autofac.Extras.RegistrationAttributes;
using EF.Models;

namespace Api
{
    public class AutoRegistrationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<InventContext>().As<IInventContext>().InstancePerDependency();
            builder.RegisterType<InventContext>().As<IScopedInventContext>().InstancePerLifetimeScope();
            builder.AutoRegistration(GetType().Assembly);
            builder.RegisterModule<EF.Models.AutoRegistrationModule>();
        }
    }
}