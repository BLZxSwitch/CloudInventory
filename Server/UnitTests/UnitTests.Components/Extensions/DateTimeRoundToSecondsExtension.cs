using System;

namespace UnitTests.Components.Extensions
{
    public static class DateTimeRoundToSecondsExtension
    {
        public static DateTime RoundToSeconds(this DateTime value)
        {
            return Round(value, TimeSpan.TicksPerSecond);
        }

        public static DateTime RoundToMinutes(this DateTime value)
        {
            return Round(value, TimeSpan.TicksPerMinute);
        }

        private static DateTime Round(DateTime value, long miliseconds)
        {
            var seconds = (long)Math.Round((double)value.Ticks / miliseconds);
            return new DateTime(seconds * miliseconds);
        }
    }
}
