using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Api.Components.ActionExecutingContext
{
    public interface IActionExecutingContext
    {
        void SetResult(IActionResult result);
        bool IsModelValid { get; }
        ModelStateDictionary ModelState { get; }
    }
}