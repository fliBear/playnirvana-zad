using backend_zad.Database;
using backend_zad.Hubs;
using backend_zad.Models;
using backend_zad.Repositories;
using backend_zad.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationContext>(opt => opt.UseInMemoryDatabase("LocationsDB"));
// Add services to the container.
builder.Services.AddScoped<ILocationsService<PlacesApiResult>, GooglePlacesService>();
builder.Services.AddScoped<ILocationsRepository, LocationsRepository>();
builder.Services.AddScoped<ICallHandlingService<PlacesDTO, PlacesApiResult>, PlacesCallService>();
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<PlacesHub>("/Places");

app.Run();
