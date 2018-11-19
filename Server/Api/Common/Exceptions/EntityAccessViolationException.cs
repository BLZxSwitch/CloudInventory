using System;

namespace Api.Common.Exceptions
{
    public class EntityAccessViolationException : Exception
    {
        public EntityAccessViolationException(string message) : base(message) { }
    }
}
