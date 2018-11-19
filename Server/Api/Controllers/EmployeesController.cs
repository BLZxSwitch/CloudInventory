using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Components.CurrentEmployeeProvider;
using Api.Components.CurrentTenantProvider;
using Api.Components.Employees;
using Api.Components.Identities;
using Api.Components.Security;
using Api.Filters.ModelStateFilter;
using Api.Transports.Employees;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class EmployeesController : Controller
    {
        private readonly IEmployeesService _employeesService;
        private readonly Func<IUserManager> _userManagerFactory;
        private readonly ICurrentTenantProvider _currentTenantProvider;
        private readonly ICurrentEmployeeProvider _currentEmployeeProvider;

        public EmployeesController(
            IEmployeesService employeesService,
            ICurrentTenantProvider currentTenantProvider,
            ICurrentEmployeeProvider currentEmployeeProvider,
            Func<IUserManager> userManagerFactory)
        {
            _userManagerFactory = userManagerFactory;
            _employeesService = employeesService;
            _currentTenantProvider = currentTenantProvider;
            _currentEmployeeProvider = currentEmployeeProvider;
        }

        [HttpGet]
        [CompanyAdministrator]
        public async Task<IEnumerable<EmployeeDTO>> GetAll()
        {
            var tenantId = await _currentTenantProvider.GetTenantIdAsync(User);

            return await _employeesService.GetAllAsync(tenantId);
        }

        [HttpPost]
        [ModelStateFilter]
        [CompanyAdministrator]
        public async Task<EmployeeDTO> Add([FromBody] EmployeeDTO employeeDTO)
        {
            using (var userManager = _userManagerFactory())
            {
                var userId = userManager.GetUserId(User);

                var employee = await _employeesService.AddAsync(employeeDTO, userId);

                return employee;
            }
        }

        [HttpPut]
        [ModelStateFilter]
        [CompanyAdministrator]
        public async Task<EmployeeDTO> Update([FromBody] EmployeeDTO employeeDTO)
        {
            return await _employeesService.UpdateAsync(employeeDTO);
        }

        [HttpDelete]
        [ModelStateFilter]
        [CompanyAdministrator]
        public async Task Delete([FromQuery] EmployeeDeleteRequest request)
        {
            await _employeesService.DeleteAsync(request.EmployeeId);
        }
    }
}
