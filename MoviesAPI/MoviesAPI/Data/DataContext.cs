using Microsoft.EntityFrameworkCore;
using MoviesAPI.Configuration;
using MoviesAPI.Data.Mock_Data;
using MoviesAPI.Models;

namespace MoviesAPI.Data;

public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options) : base(options)
  {}
  public DbSet<Movie> Movies { get; set; }
  public DbSet<Category> Categories { get; set; }
  public DbSet<User> Users { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.ApplyConfiguration(new MovieConfiguration());
    modelBuilder.ApplyConfiguration(new CategoryConfiguration());
    modelBuilder.ApplyConfiguration(new UserConfiguration());

    modelBuilder.Seed();
  }
}

public static class DataSeeder
{
  public static void Seed(this ModelBuilder modelBuilder)
  {
    var movies = MovieData.SeedMovies();
    var categories = CategoryData.SeedCategories();
    var users = UserData.SeedUsers();

    if (movies is not null)
    {
      modelBuilder.Entity<Movie>().HasData(movies);
    }
    if (categories is not null)
    {
      modelBuilder.Entity<Category>().HasData(categories);
    }
    if (users is not null)
    {
      modelBuilder.Entity<User>().HasData(users);
    }
  }
}
