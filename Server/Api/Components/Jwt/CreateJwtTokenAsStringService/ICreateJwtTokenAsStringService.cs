using System;
using System.Collections.Generic;

namespace Api.Components.Jwt.CreateJwtTokenAsStringService
{
    public interface ICreateJwtTokenAsStringService
    {
        string Create(Guid userId, bool hasLongTimeToLive, IList<string> roles);
    }
}