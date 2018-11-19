using System;
using System.Collections.Generic;

namespace Api.Transports.Common
{
    public class UserDTO
    {
        public string Email { get; set; }

        public Guid EmployeeId { get; set; }

        public IList<string> Roles { get; set; }

        public bool IsCompanyAdministrator { get; set; }

        public string FullName { get; set; }

        public UserSettingsDTO UserSettings { get; set; }
    }
}