using backend_zad.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_zad.Database;
public class ApplicationContext : DbContext
{
    public DbSet<Call> Calls { get; set; }
    public DbSet<Response> Responses { get; set; }
    public DbSet<Request> Requests { get; set; }

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
    }
    protected override void OnConfiguring
       (DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase(databaseName: "LocationsDB");
    }

}
