using Api.Components.EmailTaken;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System;

namespace Api.Transports.Employees
{
    [As(typeof(IValidator<EmployeeDTO>))]
    public class EmployeeDTOValidator : AbstractValidator<EmployeeDTO>
    {
        public EmployeeDTOValidator(
            IEmailIsTakenProvider emailIsTakenProvider,
            IHttpContextAccessor contextAccessor)
        {
            RuleFor(request => request.Id)
                .MustAsync(async (id, cancelation) => id.HasValue
                    ? true //await employeePermissionAccessService.CanReadWriteEmployee(id.Value, contextAccessor.HttpContext.User)
                    : true);
            RuleFor(request => request.DateOfBirth)
                .Must(date => !date.Equals(default(DateTime)));
            RuleFor(request => request.Email)
                .EmailAddress()
                .MustAsync(async (request, email, cancelation) =>
                request.Id.HasValue
               ? !await emailIsTakenProvider.IsTaken(email, request.Id.Value)
               : !await emailIsTakenProvider.IsTaken(email)
               );
            RuleFor(request => request.FirstName)
                .NotNull()
                .NotEmpty();
            RuleFor(request => request.LastName)
                .NotNull()
                .NotEmpty();
        }
    }
}
