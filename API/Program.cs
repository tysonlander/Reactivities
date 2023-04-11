using API.Extensions;
using API.Middleware;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline. Order matters here. Often refered to as middleware. Things that can do something to the http request on its way in or on its way out
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers(); // this maps the routes in the controllers 

// creates a database connect (I think)
using var scope = app.Services.CreateScope(); // "using" specifies that as soon as this line is executed garbage collect
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
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
