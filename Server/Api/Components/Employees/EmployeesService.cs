using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Components.Identities;
using Api.Components.InviteUser;
using Api.Components.Roles;
using Api.Providers.CompanyProviders;
using Api.Transports.Employees;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using EF.Models;
using EF.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Components.Employees
{
    [As(typeof(IEmployeesService))]
    internal class EmployeesService : IEmployeesService
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly IMapper _mapper;
        private readonly IUserCompanyProvider _userCompanyProvider;
        private readonly Func<IEmployeeProvider> _employeeProviderFactory;
        private readonly IPrepareEmployeeForAddingProvider _prepareEmployeeForAddingProvider;
        private readonly IInviteUserService _inviteUserService;
        private readonly Func<IUserManager> _userManagerFactory;
        private readonly IEmployeeUserTransformer _employeeUserTransformer;
        private readonly Func<IInventContext, IRolesService> _rolesServiceFactory;

        public EmployeesService(Func<IInventContext> contextFactory,
            IMapper mapper,
            IUserCompanyProvider userCompanyProvider,
            IPrepareEmployeeForAddingProvider prepareEmployeeForAddingProvider,
            Func<IEmployeeProvider> employeeProviderFactory,
            Func<IUserManager> userManagerFactory,
            IEmployeeUserTransformer employeeUserTransformer,
            IInviteUserService inviteUserService,
            Func<IInventContext, IRolesService> rolesServiceFactory)
        {
            _contextFactory = contextFactory;
            _mapper = mapper;
            _userCompanyProvider = userCompanyProvider;
            _employeeProviderFactory = employeeProviderFactory;
            _inviteUserService = inviteUserService;
            _prepareEmployeeForAddingProvider = prepareEmployeeForAddingProvider;
            _userManagerFactory = userManagerFactory;
            _employeeUserTransformer = employeeUserTransformer;
            _rolesServiceFactory = rolesServiceFactory;
        }

        public async Task<IEnumerable<EmployeeDTO>> GetAllAsync(Guid tenantId)
        {
            using (var context = _contextFactory())
            {
                return await context.Employees
                    .Where(employee => employee.TenantId == tenantId)
                    .ProjectTo<EmployeeDTO>()
                    .ToListAsync();
            }
        }

        public async Task<EmployeeDTO> AddAsync(EmployeeDTO employeeDTO, Guid userId)
        {
            using (var context = _contextFactory())
            using (var rolesService = _rolesServiceFactory(context))
            using (var userManager = _userManagerFactory())
            {
                var company = await _userCompanyProvider.GetAsync(userId);

                var employee = _mapper.Map<EmployeeDTO, Employee>(employeeDTO);

                employee = _prepareEmployeeForAddingProvider.Prepare(employee, company);

                var user = _employeeUserTransformer.Transform(employee);

                await userManager.CreateAsync(user);

                context.Attach(user);

                await rolesService.SetIsAdminStateAsync(user, employeeDTO.IsAdmin);

                return _mapper.Map<Employee, EmployeeDTO>(_employeeUserTransformer.Transform(user));
            }
        }

        public async Task<EmployeeDTO> UpdateAsync(EmployeeDTO employeeDTO)
        {
            using (var context = _contextFactory())
            using (var rolesService = _rolesServiceFactory(context))
            using (var employeeProvider = _employeeProviderFactory())
            {
                var employee = await employeeProvider.GetByIdAsync(employeeDTO.Id.Value);

                _mapper.Map(employeeDTO, employee);

                context.Update(employee);

                await context.SaveChangesAsync();

                await rolesService.SetIsAdminStateAsync(employee.SecurityUser.User, employeeDTO.IsAdmin);

                return _mapper.Map<Employee, EmployeeDTO>(employee);
            }
        }

        public async Task DeleteAsync(Guid employeeId)
        {
            using (var employeeProvider = _employeeProviderFactory())
            using (var userManager = _userManagerFactory())
            {
                var employee = await employeeProvider.GetByIdAsync(employeeId);

                await userManager.DeleteAsync(employee.SecurityUser.User);
            }
        }
    }
}
