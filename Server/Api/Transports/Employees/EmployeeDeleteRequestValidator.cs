using Api.Components.EmailTaken;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Api.Transports.Employees
{
    [As(typeof(IValidator<EmployeeDeleteRequest>))]
    public class EmployeeDeleteRequestValidator : AbstractValidator<EmployeeDeleteRequest>
    {
        public EmployeeDeleteRequestValidator(
            IEmailIsTakenProvider emailIsTakenProvider)
            //IPersonalNumberIsTakenProvider personalNumberIsTakenProvider,
            //IEmployeePermissionAccessService employeePermissionAccessService,
            //IHttpContextAccessor contextAccessor)
        {
            //RuleFor(request => request.EmployeeId)
            //    .MustAsync(async (id, cancelation) => await employeePermissionAccessService.CanDeleteEmployee(id, contextAccessor.HttpContext.User));
        }
    }
}
