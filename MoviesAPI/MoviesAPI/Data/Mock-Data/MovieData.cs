using MoviesAPI.Models.Category;
using MoviesAPI.Models.Movie;

namespace MoviesAPI.Data.Mock_Data;

public class MovieData
{
    public static List<Movie> SeedMovies()
    {
        return new List<Movie>
        {
            new Movie
            {
                Id = new Guid("b1e29d5e-1c4b-4b8a-9b1e-1c4b4b8a9b1e"),
                Title = "Inception",
                ReleaseYear = 2010,
                Director = "Christopher Nolan"
            },
            new Movie
            {
                Id = new Guid("c2f29d5e-2d4b-5c8a-9c2e-2d4b5c8a9c2e"),
                Title = "The Matrix",
                ReleaseYear = 1999,
                Director = "Lana Wachowski, Lilly Wachowski"
            }
        };
    }
}
