using Api.Transports.Employees;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Components.Employees
{
    public interface IEmployeesService
    {
        Task<IEnumerable<EmployeeDTO>> GetAllAsync(Guid userId);
        Task<EmployeeDTO> AddAsync(EmployeeDTO employeeDTO, Guid userId);
        Task<EmployeeDTO> UpdateAsync(EmployeeDTO employeeDTO);
        Task DeleteAsync(Guid employeeId);
    }
}
