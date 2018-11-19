using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Api.Transports.ForgotPassword
{
    [As(typeof(IValidator<SetPasswordRequest>))]
    class SetPasswordRequestValidator : AbstractValidator<SetPasswordRequest>
    {
        public SetPasswordRequestValidator(
            IHttpContextAccessor contextAccessor)
        {
            RuleFor(request => request.Code)
                .Must(code => !string.IsNullOrEmpty(code));

            RuleFor(request => request.Password)
                .Must(password => !string.IsNullOrEmpty(password));

            RuleFor(request => request.ToSAccepted)
                .Must(toSAccepted => toSAccepted);
        }
    }
}
