using EF.Models.Models;

namespace Api.Components.Employees
{
    public interface IPrepareEmployeeForAddingProvider
    {
        Employee Prepare(Employee employee, Company company);
    }
}
