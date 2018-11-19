using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac.Extras.RegistrationAttributes.RegistrationAttributes;
using EF.Manager.Components.JsonDataReader;
using EF.Models;
using EF.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EF.Manager.TestSeeding.Users
{
    [As(typeof(UsersSeeder))]
    public class UsersSeeder
    {
        private readonly Func<IInventContext> _contextFactory;
        private readonly ITestJsonDataReader<List<User>> _userJsonDataReader;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UsersSeeder(
            Func<IInventContext> contextFactory,
            ITestJsonDataReader<List<User>> userJsonDataReader,
            IPasswordHasher<User> passwordHasher)
        {
            _contextFactory = contextFactory;
            _userJsonDataReader = userJsonDataReader;
            _passwordHasher = passwordHasher;
        }

        public async Task Seed()
        {
            using (var context = _contextFactory())
            {
                var users = _userJsonDataReader.Read("users/users.json");
                foreach (var user in users)
                {
                    if (await context.Users.AnyAsync(u => u.Id == user.Id) == false)
                    {
                        user.PasswordHash = _passwordHasher.HashPassword(user, user.PasswordHash);
                        context.Users.Add(user);
                    }
                }

                await context.SaveChangesAsync();
            }
        }
    }
}