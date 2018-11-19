using EF.Models.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Components.Employees
{
    public interface IEmployeeProvider : IDisposable
    {
        Task<Employee> GetByIdAsync(Guid employeeId);

        Task<Employee> GetByUserIdAsync(Guid userId);

        Task<List<Employee>> GetListByIdsAsync(List<Guid> employeeIds);
    }
}
