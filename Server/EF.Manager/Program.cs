using System;
using System.Text;
using EF.Manager.Components.Host;
using Microsoft.AspNetCore.Hosting;

namespace EF.Manager
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;
            var host = BuildWebHost(args);
            try
            {
                host.StartAsync().GetAwaiter().GetResult();
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Caught ArgumentException: {ex.Message}");
            }
        }
        
        public static IWebHost BuildWebHost(string[] args)
        {
            return new HostBuilder()
                .BuildConfiguration(args)
                .UseStartup<Startup>()
                .Build();
        }
    }
}