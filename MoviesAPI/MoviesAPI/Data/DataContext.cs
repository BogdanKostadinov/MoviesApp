using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data.Mock_Data;
using MoviesAPI.Models;

namespace MoviesAPI.Data;

public class DataContext : DbContext
{
  public DataContext(DbContextOptions<DataContext> options) : base(options)
  {
  }
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Seed();
    base.OnModelCreating(modelBuilder);
  }

  public DbSet<Movie> Movies { get; set; }
  public DbSet<Category> Categories { get; set; }

}

public static class DataSeeder
{
  public static void Seed(this ModelBuilder modelBuilder)
  {
    var movies = MovieData.SeedMovies();
    var categories = CategoryData.SeedCategories();

    if (movies is not null)
    {
      modelBuilder.Entity<Movie>().HasData(movies);
    }
    if (categories is not null)
    {
      modelBuilder.Entity<Category>().HasData(categories);
    }

  }
}
