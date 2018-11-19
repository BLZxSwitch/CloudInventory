using Api.Components.CompanyNameIsTaken;
using Api.Components.EmailTaken;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using FluentValidation;

namespace Api.Transports.CompanyRegister
{
    [As(typeof(IValidator<CompanyRegisterRequest>))]
    public class CompanyRegisterRequestValidator : AbstractValidator<CompanyRegisterRequest>
    {
        public CompanyRegisterRequestValidator(
            IEmailIsTakenProvider emailIsTakenProvider,
            ICompanyNameIsTakenProvider companyNameIsTakenProvider)
        {
            RuleFor(x => x.ValidationToken).NotEmpty();

            RuleFor(request => request.ToSAccepted)
                .Must(toSAccepted => toSAccepted);

            RuleFor(request => request.CompanyName)
                .NotEmpty()
                .MustAsync(async (name, cancelation) => await companyNameIsTakenProvider.IsTaken(name) == false);
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.CompanyPhone).NotEmpty();
            RuleFor(x => x.Email)
                .EmailAddress()
                .MustAsync(async (email, cancelation) => await emailIsTakenProvider.IsTaken(email) == false);
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}