using EF.Models.Models;

namespace Api.Components.Employees
{
    public interface IEmployeeUserTransformer
    {
        User Transform(Employee employee);

        Employee Transform(User user);
    }
}
