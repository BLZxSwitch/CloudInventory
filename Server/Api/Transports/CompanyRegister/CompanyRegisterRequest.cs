using EF.Models.Enums;
using System;

namespace Api.Transports.CompanyRegister
{
    public class CompanyRegisterRequest
    {
        public string CompanyName { get; set; }
        public string CompanyPhone { get; set; }
        public string Address { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }

        public Gender Gender { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PatronymicName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string ValidationToken { get; set; }

        public bool ToSAccepted { get; set; }
    }
}