using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Internal;
using FluentValidation.Results;
using FluentValidation.Validators;

namespace UnitTests.Components.Extensions
{
    public static class FluentValidationExtenstions
    {
        public static PropertyValidatorContext PropertyContext<TModel, TProperty>(
            this AbstractValidator<TModel> validator,
            TModel model,
            Expression<Func<TModel, TProperty>> expression)
        {
            var propertyRule = validator
                .OfType<PropertyRule>()
                .SingleOrDefault(rule => rule.Member == expression.GetMember());
            
            var projector = expression.Compile();
            var value = projector(model);
            
            var validationContext = new ValidationContext<TModel>(model, new PropertyChain(),
                ValidatorOptions.ValidatorSelectors.DefaultValidatorSelectorFactory());

            return new PropertyValidatorContext(validationContext, propertyRule,
                expression.GetMember().Name, value);
        }

        public static async Task<IEnumerable<ValidationFailure>> ValidateAsync<TValidator>(
            this PropertyValidatorContext context)
            where TValidator : AsyncValidatorBase
        {
            var propertyValidator = context.Rule.Validators.OfType<TValidator>().Single();
            return await propertyValidator.ValidateAsync(context, CancellationToken.None);
        }
    }
}