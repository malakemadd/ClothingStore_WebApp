
using ClothingAPIs.Helpers;
using ClothingAPIs.IRepoServices;
using ClothingAPIs.Models;
using ClothingAPIs.RepoServices;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ClothingAPIs
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular",
                policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            builder.Services.AddDistributedMemoryCache(); // To store session data in memory
            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(10); // Set session timeout
                options.Cookie.HttpOnly = true; // Ensure cookie is accessible only by the server
                options.Cookie.IsEssential = true; // Make the session cookie essential
            });

            // Add services to the container.
            //builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("Stripe"));
            builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("Stripe"));
            builder.Services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<StripeSettings>>().Value);
            builder.Services.AddHttpClient();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            #region Services
            builder.Services.AddScoped<IEmailSettings, EmailSettings>();
            builder.Services.AddScoped<IWishListService, WishListService>();
            builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
            {

            }).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

            builder.Services.AddAuthentication(
            options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            }
            ).AddCookie(

                options => options.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = context =>
                    {
                        if (context.Request.Path.StartsWithSegments("/api"))
                        {
                            // For API requests, return a 401 Unauthorized response instead of a redirect
                            context.Response.StatusCode = 401;
                            context.Response.ContentType = "application/json";
                            return Task.CompletedTask;
                        }

                        // For non-API requests, perform the default behavior (redirect to login page)
                        context.Response.Redirect(context.RedirectUri);
                        return Task.CompletedTask;
                    }
                }



                ).AddGoogle(options =>
                {
                    IConfigurationSection googleAuthNSection =
                        builder.Configuration.GetSection("Authentication:Google");

                    options.ClientId = googleAuthNSection["ClientId"];
                    options.ClientSecret = googleAuthNSection["ClientSecret"];
                })
.AddFacebook(options =>
{
    IConfigurationSection facebookAuthNSection =
        builder.Configuration.GetSection("Authentication:Facebook");

    options.AppId = facebookAuthNSection["AppId"];
    options.AppSecret = facebookAuthNSection["AppSecret"];
});



            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true; // Prevent login without email confirmation
            });

            #endregion
            var app = builder.Build();
            app.UseSession();
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowAngular");
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
