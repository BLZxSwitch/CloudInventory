using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Components.Employees
{
    [As(typeof(IEmployeeProvider))]
    public class EmployeeProvider : IEmployeeProvider
    {
        private readonly IInventContext _InventContext;

        public EmployeeProvider(IInventContext InventContext)
        {
            _InventContext = InventContext;
        }

        public void Dispose()
        {
            _InventContext.Dispose();
        }

        public async Task<Employee> GetByIdAsync(Guid employeeId)
        {
            var employee = await _InventContext.Employees
                .SingleOrDefaultAsync(e => e.Id == employeeId);

            return employee;
        }

        public async Task<Employee> GetByUserIdAsync(Guid userId)
        {
            var employee = await _InventContext.Employees
                .SingleOrDefaultAsync(e => e.SecurityUser.UserId == userId);

            return employee;
        }

        public async Task<List<Employee>> GetListByIdsAsync(List<Guid> employeeIds)
        {
            return await _InventContext.Employees
                .Where(e => employeeIds.Contains(e.Id))
                .ToListAsync();
        }
    }
}
