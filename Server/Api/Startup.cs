using Api.Common;
using Api.Components.Captcha;
using Api.Components.CompanyRegister;
using Api.Components.DependencyInjectionExtensions;
using Api.Components.EmailSender;
using Api.Components.Identities;
using Api.Components.InviteUser;
using Api.Components.JsonConverters;
using Api.Components.Jwt;
using Api.Components.Jwt.TokenValidationParametersProvider;
using Api.Components.Otp;
using Api.Components.TermsOfService;
using Api.Filters.BadRequestExceptionFilter;
using Api.Filters.SecurityTokenExpiredExceptionFilter;
using Api.Filters.RenewAccessToken;
using Api.Filters.TermsOfService;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using EF.Models;
using EF.Models.Models;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using NJsonSchema;
using NJsonSchema.Generation.TypeMappers;
using NSwag.AspNetCore;
using SendGrid;
using System;
using System.Globalization;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public IServiceProvider ServiceProvider { get; private set; }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddIdentity<User, Role>(
                    options =>
                    {
                        options.User.RequireUniqueEmail = true;
                        options.Password.RequireDigit = false;
                        options.Password.RequiredLength = 1;
                        options.Password.RequiredUniqueChars = 0;
                        options.Password.RequireLowercase = false;
                        options.Password.RequireNonAlphanumeric = false;
                        options.Password.RequireUppercase = false;
                    }
                )
                .AddEntityFrameworkStores<InventContext>()
                .PatchEntityFrameworkStoresRegistrations()
                .AddDefaultTokenProviders()
                .AddInviteUserTokenProvider()
                .AddUserManager<UserManager>();

            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    var tokenValidationParametersProvider = ServiceProvider
                        .GetRequiredService<ITokenValidationParametersProvider>();
                    options.TokenValidationParameters = tokenValidationParametersProvider.GetParameters();
                });

            services
                .AddMvcCore(options =>
                {
                    options.Filters.Add<TermsOfServiceFilter>();
                    options.Filters.Add<RenewAccessTokenFilter>();
                    options.Filters.Add<BadRequestExceptionFilter>();
                    options.Filters.Add<SecurityTokenExpiredExceptionFilter>();
                })
                .AddAuthorization()
                .AddJsonFormatters(settings =>
                {
                    settings.Converters.Add(new MillisecondsEpochConverter());
                })
                .AddFluentValidation();

            services
                .AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Unspecified;
                });

            services.AddCors(options => options.AddPolicy("AllowAll", p => p
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()));

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddDbContext<InventContext>(options => options
                .UseLazyLoadingProxies()
                .EnableSensitiveDataLogging()
                .UseSqlServer(Configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Transient);

            services.Configure<JwtTokenOptions>(Configuration.GetSection("JwtToken"));
            services.Configure<CaptchaOptions>(Configuration.GetSection("CaptchaOptions"));
            services.Configure<AuthOtpOptions>(Configuration.GetSection("AuthOtpOptions"));
            services.Configure<TermsOfServiceOptions>(Configuration.GetSection("TermsOfServiceOptions"));
            services.AddAutoMapper();

            services.AddLocalization(opts => { opts.ResourcesPath = "Resources"; });

            ServiceProvider = CreateServiceProvider(services);
            return ServiceProvider;
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            var emailConfiguration = Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
            
            builder.RegisterInstance<IEmailConfiguration>(emailConfiguration);
            builder.RegisterInstance<ISendGridClient>(new SendGridClient(emailConfiguration.ApiKey));
            builder.RegisterInstance<ICommonConfiguration>(Configuration.GetSection("CommonConfiguration")
                .Get<CommonConfiguration>());
            builder.RegisterInstance<IInternalNotificationsConfiguration>(Configuration
                .GetSection("InternalNotificationsConfiguration")
                .Get<InternalNotificationsConfiguration>());
        }

        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("AllowAll");
            }

            var supportedCultures = new[]
            {
                new CultureInfo("en"),
                new CultureInfo("ru"),
            };
            app.UseRequestLocalization(
                new RequestLocalizationOptions
                {
                    DefaultRequestCulture = new RequestCulture("ru"),
                    SupportedCultures = supportedCultures,
                    SupportedUICultures = supportedCultures
                }
            );

            var options = new RewriteOptions()
                .AddRewrite(@"^(?!api/|swagger/|.*\..*).*$", "index.html", true);
            app.UseRewriter(options);

            app.UseDefaultFiles();

            var provider = new FileExtensionContentTypeProvider
            {
                Mappings = {[".jp2"] = "image/jp2"}
            };
            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = provider
            });

            app.UseStaticFiles();

            app.UseSwaggerUi(typeof(Startup).Assembly, settings =>
            {
                settings.GeneratorSettings.TypeMappers.Add(
                    new PrimitiveTypeMapper(typeof(DateTime), s =>
                    {
                        s.Type = JsonObjectType.Number;
                        s.Format = "long";
                    }));
            });
            app.UseAuthentication();
            app.UseMvc();
        }

        private IServiceProvider CreateServiceProvider(IServiceCollection services)
        {
            var autofacServiceProviderFactory =
                new AutofacServiceProviderFactory(builder => builder.RegisterModule(new AutoRegistrationModule()));
            var containerBuilder = autofacServiceProviderFactory.CreateBuilder(services);

            ConfigureContainer(containerBuilder);

            var serviceProvider = autofacServiceProviderFactory.CreateServiceProvider(containerBuilder);
            return serviceProvider;
        }
    }
}