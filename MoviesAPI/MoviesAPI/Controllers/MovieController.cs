using Microsoft.AspNetCore.Mvc;
using MoviesAPI.Data;
using MoviesAPI.Models;

namespace MoviesAPI.Controllers;

[ApiController]
[Route("/movies")]
public class MovieController : ControllerBase
{
  private readonly ILogger<MovieController> _logger;
  private readonly DataContext _context;

  public MovieController(ILogger<MovieController> logger, DataContext context)
  {
    _logger = logger;
    _context = context;
  }

  [HttpGet(Name = "GetMovies")]
  public IEnumerable<Movie> GetMovies()
  {
    var movies = _context.Movies.ToList();
    return _context.Movies;
  }
}
