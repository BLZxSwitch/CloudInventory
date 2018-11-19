using System;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.GuidsProviders
{
    [As(typeof(ISequentialGuidProvider))]
    class SequentialGuidProvider : ISequentialGuidProvider
    {
        public Guid Get()
        {
            return RT.Comb.Provider.Sql.Create();
        }
    }
}