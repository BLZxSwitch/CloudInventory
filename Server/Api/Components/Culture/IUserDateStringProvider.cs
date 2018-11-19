using EF.Models.Models;
using System;

namespace Api.Components.Culture
{
    public interface IUserDateStringProvider
    {
        string Get(SecurityUser securityUser, DateTime date);
    }
}