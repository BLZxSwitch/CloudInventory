using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using SecurityDriven.Inferno;

namespace Api.Components.Otp
{
    [As(typeof(IRandomArrayGenerator))]
    class RandomArrayGenerator : IRandomArrayGenerator
    {
        public byte[] Get()
        {
            var bytes = new byte[15];
            var cryptoRandom = new CryptoRandom();
            cryptoRandom.NextBytes(bytes);
            return bytes;
        }
    }
}