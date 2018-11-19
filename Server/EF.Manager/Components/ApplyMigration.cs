using System;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EF.Manager.Components
{
    [As(typeof(ApplyMigration))]
    class ApplyMigration
    {
        private readonly Func<InventContext> _contextFactory;
        private readonly ILogger<Program> _logger;

        public ApplyMigration(
            Func<InventContext> contextFactory,
            ILogger<Program> logger)
        {
            _contextFactory = contextFactory;
            _logger = logger;
        }

        public Task MigrateAsync()
        {
            using (var context = _contextFactory())
            {
                try
                {
                    context.Database.Migrate();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred while applying the migrations.");
                    return Task.FromException(ex);
                }
            }

            return Task.FromResult(0);
        }
    }
}