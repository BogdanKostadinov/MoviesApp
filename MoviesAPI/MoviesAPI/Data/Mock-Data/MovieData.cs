using MoviesAPI.Models;

namespace MoviesAPI.Data.Mock_Data;

public class MovieData
{
  public static List<Movie> SeedMovies()
  {
    var movie1Id = new Guid("b1e29d5e-1c4b-4b8a-9b1e-1c4b4b8a9b1e");
    var movie2Id = new Guid("c2f29d5e-2d4b-5c8a-9c2e-2d4b5c8a9c2e");

    return new List<Movie>
        {
            new Movie
            {
                Id = movie1Id,
                Title = "Inception",
                ReleaseYear = 2010,
                Director = "Christopher Nolan",
                DateCreated = new DateTime(2023, 1, 1),
                LastModified = new DateTime(2023, 1, 1)
            },
            new Movie
            {
                Id = movie2Id,
                Title = "The Matrix",
                ReleaseYear = 1999,
                Director = "Lana Wachowski, Lilly Wachowski",
                DateCreated = new DateTime(2023, 1, 1),
                LastModified = new DateTime(2023, 1, 1)
            }
        };
  }
}
