using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using System.Collections.Generic;
using Api.Components.GuidsProviders;

namespace Api.Components.Employees
{
    [As(typeof(IPrepareEmployeeForAddingProvider))]
    public class PrepareEmployeeForAddingProvider : IPrepareEmployeeForAddingProvider
    {
        private readonly INewGuidProvider _newGuidProvider;

        public PrepareEmployeeForAddingProvider(INewGuidProvider newGuidProvider)
        {
            _newGuidProvider = newGuidProvider;
        }

        public Employee Prepare(Employee employee, Company company)
        {
            employee.CompanyId = company.Id;
            employee.TenantId = company.TenantId;
            employee.SecurityUser.TenantId = company.TenantId;
            employee.SecurityUser.User.ConcurrencyStamp = _newGuidProvider.Get().ToString();
            employee.SecurityUser.User.Roles = new List<UserRole>
            {
                new UserRole {RoleId = UserRoles.Employee.RoleId}
            };

            return employee;
        }
    }
}
