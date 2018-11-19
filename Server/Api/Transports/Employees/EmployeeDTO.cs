using System;
using EF.Models.Enums;

namespace Api.Transports.Employees
{
    public class EmployeeDTO
    {
        public Guid? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PatronymicName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsInvited { get; set; }
        public bool IsActive { get; set; }
        public bool IsInvitationAccepted { get; set; }
        public string FullName { get; set; }
    }
}