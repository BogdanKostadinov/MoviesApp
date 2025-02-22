using Microsoft.AspNetCore.Mvc;
using MoviesAPI.Models;

namespace MoviesAPI.Controllers;

[ApiController]
[Route("/movies")]
public class MovieController : ControllerBase
{
  private readonly ILogger<MovieController> _logger;

  public MovieController(ILogger<MovieController> logger)
  {
    _logger = logger;
  }

  [HttpGet(Name = "GetMovies")]
  public IEnumerable<Movie> GetMovies()
  {
    return [];
  }
}
