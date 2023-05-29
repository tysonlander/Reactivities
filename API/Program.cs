using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline. Order matters here. Often refered to as middleware. Things that can do something to the http request on its way in or on its way out
app.UseMiddleware<ExceptionMiddleware>();

app.UseXContentTypeOptions(); // prevents mind sniffing of the conent type
app.UseReferrerPolicy(opt => opt.NoReferrer()); // controll how much information is included when navigating away from our app
app.UseXXssProtection(opt => opt.EnabledWithBlockMode()); // Cross site scripting protection header
app.UseXfo(opt => opt.Deny()); // protects against click jacking by not allowing applicaiton to be used in an iframe
app.UseCsp(opt => opt
    .BlockAllMixedContent()
    .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com"))
    .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
    .FormActions(s => s.Self())
    .FrameAncestors(s => s.Self())
    .ImageSources(s => s.Self().CustomSources("blob:", "https://res.cloudinary.com", "https://platform-lookaside.fbsbx.com"))
    .ScriptSources(s => s.Self())
); // main defense against cross site scipting // can also run in UseCspReportOnly() to toubleshoot

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles(); // without configuration this defaults to serving up files from wwwroot folder... so set client to build files to this location
app.MapFallbackToController("Index", "Fallback"); // Falls back to "FallbackController"

app.MapControllers(); // this maps the routes in the controllers 
app.MapHub<ChatHub>("/chat");

// creates a database connect (I think)
using var scope = app.Services.CreateScope(); // "using" specifies that as soon as this line is executed garbage collect
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
    throw;
}

app.Run();


// Start backend with : dotnet watch --no-hot-reload 
// Start the frontend: cd into 'client-app' 'nmp start'
