using System;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.Factories
{
    [As(typeof(IFactory<,>))]
    public class Factory1Param<TParam, T> : IFactory<TParam, T>
    {
        private readonly Func<TParam, T> _factory;

        public Factory1Param(Func<TParam, T> factory)
        {
            _factory = factory;
        }

        public T Create(TParam param)
        {
            return _factory(param);
        }
    }
}