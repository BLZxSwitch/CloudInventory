using System;

namespace Api.Components.NowProvider
{
    public interface INowProvider
    {
        DateTime Now();
    }
}