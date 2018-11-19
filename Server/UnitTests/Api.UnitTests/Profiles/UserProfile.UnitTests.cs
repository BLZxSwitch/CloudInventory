﻿using Api.Profiles;
using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Api.UnitTests.Profiles
{
    [TestClass]
    public class UserProfileUnitTests
    {
        private MapperConfiguration _config;

        [TestInitialize]
        public void TestInitialize()
        {
            _config = new MapperConfiguration(cfg => {
                cfg.AddProfile<UserProfile>();
            });
        }

        [TestMethod]
        public void ShouldConfigurationBeValid()
        {
            _config.AssertConfigurationIsValid();
        }
    }
}
