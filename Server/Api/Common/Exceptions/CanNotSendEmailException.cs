using System;

namespace Api.Common.Exceptions
{
    public class CanNotSendEmailException : Exception
    {
        public CanNotSendEmailException(string message) : base(message) { }
    }
}
