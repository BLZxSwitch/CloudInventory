using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Manager.Components;
using EF.Manager.ProductionSeeding;
using EF.Manager.TestSeeding.Companies;
using EF.Manager.TestSeeding.OrgUnits;
using EF.Manager.TestSeeding.OrgUnitsMOL;
using EF.Manager.TestSeeding.Users;
using Microsoft.Extensions.Options;

namespace EF.Manager
{
    [As(typeof(IStartable))]
    internal class Startup : IStartable
    {
        private readonly ApplyMigration _applyMigration;
        private readonly ProductionSeeder _productionSeeder;
        private readonly IOptions<SeedingOptions> _options;
        private readonly UsersSeeder _usersSeeder;
        private readonly CompaniesSeeder _companiesSeeder;
        private readonly OrgUnitsSeeder _orgUnitsSeeder;
        private readonly OrgUnitsMOLSeeder _orgUnitsMOLSeeder;

        public Startup(
            ApplyMigration applyMigration,
            ProductionSeeder productionSeeder,
            IOptions<SeedingOptions> options,
            UsersSeeder usersSeeder,
            CompaniesSeeder companiesSeeder,
            OrgUnitsSeeder orgUnitsSeeder,
            OrgUnitsMOLSeeder orgUnitsMOLSeeder)
        {
            _applyMigration = applyMigration;
            _productionSeeder = productionSeeder;
            _options = options;
            _usersSeeder = usersSeeder;
            _companiesSeeder = companiesSeeder;

            _orgUnitsSeeder = orgUnitsSeeder;
            _orgUnitsMOLSeeder = orgUnitsMOLSeeder;
        }

        public async Task StartAsync()
        {
            await _applyMigration.MigrateAsync();
            await _productionSeeder.Seed();

            if (_options.Value.SeedWithTestData)
            {
                await _companiesSeeder.Seed();
                await _usersSeeder.Seed();
                await _orgUnitsSeeder.Seed();
                await _orgUnitsMOLSeeder.Seed();
            }
        }
    }
}