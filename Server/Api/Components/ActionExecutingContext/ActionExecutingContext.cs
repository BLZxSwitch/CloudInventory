using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Api.Components.ActionExecutingContext
{
    [As(typeof(IActionExecutingContext))]
    class ActionExecutingContext : IActionExecutingContext
    {
        private readonly Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext _context;

        public ActionExecutingContext(Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext context)
        {
            _context = context;
        }

        public void SetResult(IActionResult result)
        {
            _context.Result = result;
        }

        public bool IsModelValid => _context.ModelState.IsValid;

        public ModelStateDictionary ModelState => _context.ModelState;
    }
}