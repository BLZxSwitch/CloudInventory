using System;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Factories
{
    [As(typeof(IFactory<>))]
    public class Factory<T> : IFactory<T>
    {
        private readonly Func<T> _factory;

        public Factory(Func<T> factory)
        {
            _factory = factory;
        }

        public T Create()
        {
            return _factory();
        }
    }
}