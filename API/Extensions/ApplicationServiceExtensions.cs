using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection service, IConfiguration config)
        {
            service.AddEndpointsApiExplorer();
            service.AddSwaggerGen();
            service.AddDbContext<DataContext>(opt =>
            {
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            service.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");
                });
            });
            service.AddMediatR(typeof(List.Handler));
            service.AddAutoMapper(typeof(MappingProfiles).Assembly);
            service.AddFluentValidationAutoValidation();
            service.AddValidatorsFromAssemblyContaining<Create>();
            service.AddHttpContextAccessor();
            service.AddScoped<IUserAccessor, UserAccessor>(); // this makes these available to be injected into our application handlers
            service.AddScoped<IPhotoAccessor, PhotoAccessor>();
            service.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            service.AddSignalR();


            return service;

        }
    }
}