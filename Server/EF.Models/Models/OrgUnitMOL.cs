using System;

namespace EF.Models.Models
{
    public class OrgUnitMOL
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid OrgUnitId { get; set; }
        //public Guid DocId { get; set; }

        public DateTime DateIn { get; set; }
        public DateTime? DateOut { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual OrgUnit OrgUnit { get; set; }
        //public virtual OrgUnitMOLDoc OrgUnitMOLDoc { get; set; }        
    }
}
