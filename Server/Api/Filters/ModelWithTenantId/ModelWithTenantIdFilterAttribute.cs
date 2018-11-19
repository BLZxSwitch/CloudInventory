using Microsoft.AspNetCore.Mvc;

namespace Api.Filters.ModelWithTenantId
{
    public class ModelWithTenantIdFilterAttribute : ServiceFilterAttribute
    {
        public ModelWithTenantIdFilterAttribute() : base(typeof(ModelWithTenantIdFilter))
        {
        }
    }
}