using System;

namespace Api.Filters.ModelWithTenantId
{
    public interface IModelWithTenantId
    {
        Guid TenantId { get; set; }
    }
}
