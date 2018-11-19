using Api.Components.Otp;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace Api.Transports.AuthOtp
{
    [As(typeof(IValidator<OtpActivationRequest>))]
    public class OtpActivationRequestValidator : AbstractValidator<OtpActivationRequest>
    {
        public OtpActivationRequestValidator(IOptions<AuthOtpOptions> options)
        {
            RuleFor(request => request.Otp)
                .Length((int) options.Value.Digits);
            RuleFor(request => request.Password)
                .NotEmpty();
            RuleFor(request => request.OtpToken)
                .NotEmpty();
        }
    }
}
