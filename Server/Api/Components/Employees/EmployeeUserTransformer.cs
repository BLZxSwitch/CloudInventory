using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models.Models;

namespace Api.Components.Employees
{
    [As(typeof(IEmployeeUserTransformer))]
    public class EmployeeUserTransformer : IEmployeeUserTransformer
    {
        public User Transform(Employee employee)
        {
            var user = employee.SecurityUser.User;
            user.SecurityUser = employee.SecurityUser;
            user.SecurityUser.Employee = employee;

            return user;
        }

        public Employee Transform(User user)
        {
            var employee = user.SecurityUser.Employee;
            employee.SecurityUser = user.SecurityUser;
            employee.SecurityUser.User = user;

            return employee;
        }
    }
}
