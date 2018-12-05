using System;

namespace Api.Transports.OrgUnits
{
    public class OrgUnitDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CurrentOrgUnitMOLId { get; set; }
        public bool IsWarehouse { get; set; }
    }
}