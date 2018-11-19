using System;
using System.Threading;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.DependencyInjection;

namespace EF.Manager.Components.Host
{
    public class Host : IWebHost
    {
        public Host(IServiceProvider services)
        {
            Services = services;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public void Start()
        {
            throw new NotImplementedException();
        }

        public Task StartAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            var startable = Services.GetRequiredService<IStartable>();
            return startable.StartAsync();
        }

        public Task StopAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            throw new NotImplementedException();
        }

        public IFeatureCollection ServerFeatures { get; }
        public IServiceProvider Services { get; }
    }
}