using System;
using System.IO;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using EF.Models;
using EF.Models.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace EF.Manager.Components.Host
{
    public class HostBuilder
    {
        private IConfigurationRoot _configuration;
        private Type _startupType;

        public IWebHost Build()
        {
            var services = new ServiceCollection();

            services.AddTransient(_startupType, _startupType);
            services.AddDbContext<InventContext>(options =>
                options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly("EF.Manager")), ServiceLifetime.Transient);
            services.AddTransient<IInventContext>(provider => provider.GetService<InventContext>());

            services.TryAddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
            
            services.AddSingleton<IConfiguration>(_configuration);
            services.AddOptions();
            services.AddLogging();
            services.Configure<SeedingOptions>(_configuration.GetSection("Seeding"));

            var serviceProvider = CreateServiceProvider(services);

            return new Host(serviceProvider);
        }

        public HostBuilder BuildConfiguration(string[] args)
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .AddCommandLine(args)
                .Build();

            return this;
        }

        public HostBuilder UseStartup<TStartup>()
            where TStartup : IStartable
        {
            _startupType = typeof(TStartup);
            return this;
        }

        private static IServiceProvider CreateServiceProvider(ServiceCollection services)
        {
            var autofacServiceProviderFactory =
                new AutofacServiceProviderFactory(builder => builder.RegisterModule(new AutoRegistrationModule()));
            services.AddSingleton<IServiceProviderFactory<ContainerBuilder>>(autofacServiceProviderFactory);
            var containerBuilder = autofacServiceProviderFactory.CreateBuilder(services);
            var serviceProvider = autofacServiceProviderFactory.CreateServiceProvider(containerBuilder);
            return serviceProvider;
        }
    }
}