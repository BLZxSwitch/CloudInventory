using System;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;

namespace Api.Components.NowProvider
{
    [As(typeof(INowProvider))]
    [SingleInstance]
    internal class NowProvider : INowProvider
    {
        public DateTime Now()
        {
            return DateTime.Now;
        }
    }
}