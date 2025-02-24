using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.Data.Mock_Data;
using MoviesAPI.DTOs.Movie;
using MoviesAPI.Models;

namespace MoviesAPI.Controllers;

[ApiController]
[Route("/movies")]
public class MovieController : ControllerBase
{
  private readonly ILogger<MovieController> _logger;
  private readonly DataContext _context;
  private readonly IMapper _mapper;

  public MovieController(ILogger<MovieController> logger, DataContext context, IMapper mapper)
  {
    _logger = logger;
    _context = context;
    _mapper = mapper;
  }

  [HttpGet(Name = "GetMovies")]
  public async Task<IActionResult> GetMoviesAsync()
  {
    var movies = await _context.Movies.ToListAsync();
    var movieDTOs = _mapper.Map<IEnumerable<MovieDTO>>(movies);
    return Ok(movieDTOs);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetMovieAsync(Guid id)
  {
    var movie = await _context.Movies.FindAsync(id);
    if (movie == null)
    {
      return NotFound();
    }
    var movieDTO = _mapper.Map<MovieDTO>(movie);
    return Ok(movieDTO);
  }

  [HttpPost]
  public async Task<IActionResult> CreateMovieAsync([FromBody] MovieCreateDTO newMovie)
  {
    try
    {
      var movie = _mapper.Map<Movie>(newMovie);
      movie.Id = Guid.NewGuid();

      await _context.Movies.AddAsync(movie);
      await _context.SaveChangesAsync();

      return Ok(movie);
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error creating movie");
      return StatusCode(500, "Internal server error");
    }
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateMovieAsync(Guid id, [FromBody] MovieUpdateDTO updatedMovie)
  {
    var movie = await _context.Movies.FindAsync(id);

    if (movie is not null)
    {
      movie.Title = updatedMovie.Title;
      movie.ReleaseYear = updatedMovie.ReleaseYear;
      movie.Genre = updatedMovie.Genre;
      movie.Director = updatedMovie.Director;

      _context.Movies.Update(movie);
      await _context.SaveChangesAsync();

      return Ok(movie);
    }
    return NotFound();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteMovieAsync(Guid id)
  {
    var movie = await _context.Movies.FindAsync(id);
    if (movie is not null)
    {
      _context.Movies.Remove(movie);
      await _context.SaveChangesAsync();
      return Ok();
    }
    return NotFound();
  }
}
