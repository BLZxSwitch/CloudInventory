using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Api.Components.DependencyInjectionExtensions
{
    public static class IdentityEntityFrameworkPatchBuilderExtensions
    {
        public static IdentityBuilder PatchEntityFrameworkStoresRegistrations(this IdentityBuilder builder)
        {
            PatchStoreRegistration(builder.Services, typeof(IUserStore<>).MakeGenericType(builder.UserType));
            PatchStoreRegistration(builder.Services, typeof(IRoleStore<>).MakeGenericType(builder.RoleType));
            return builder;
        }

        private static void PatchStoreRegistration(IServiceCollection services, Type storeType)
        {
            var descriptor = services.Single(d => d.ServiceType == storeType);
            var serviceDescriptor = ServiceDescriptor.Describe(descriptor.ServiceType, descriptor.ImplementationType,
                ServiceLifetime.Transient);
            services.RemoveAll(storeType);
            services.TryAdd(serviceDescriptor);
        }
    }
}