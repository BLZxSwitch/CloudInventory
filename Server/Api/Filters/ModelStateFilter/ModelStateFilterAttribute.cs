using Microsoft.AspNetCore.Mvc;

namespace Api.Filters.ModelStateFilter
{
    public class ModelStateFilterAttribute: ServiceFilterAttribute
    {
        public ModelStateFilterAttribute() : base(typeof(ModelStateFilter))
        {
        }
    }
}