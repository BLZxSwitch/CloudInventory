using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Components.Security
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class CompanyAdministratorAttribute :    TypeFilterAttribute
    {
        public CompanyAdministratorAttribute() : base(typeof(CompanyAdministratorFilter))
        {
        }
    }
}
