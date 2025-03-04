using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.DTOs;
using MoviesAPI.Models;
using MoviesAPI.Validation.MovieValidation;

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
    var movies = await _context.Movies
        .Include(m => m.Categories)
        .ToListAsync();

    var movieDTOs = _mapper.Map<IEnumerable<MovieDTO>>(movies);
    return Ok(movieDTOs);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetMovieAsync(Guid id)
  {
    var movie = await _context.Movies
        .Include(m => m.Categories)
        .FirstOrDefaultAsync(m => m.Id == id);

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
    var validator = new MovieCreateDTOValidator(_context);
    var validationResult = await validator.ValidateAsync(newMovie);

    if (!validationResult.IsValid)
    {
      foreach (var error in validationResult.Errors)
      {
        ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
      }
      return BadRequest(ModelState);
    }

    try
    {
      var movie = _mapper.Map<Movie>(newMovie);
      movie.Id = Guid.NewGuid();

      // Retrieve existing categories from the database
      var categories = await _context.Categories
          .Where(c => newMovie.CategoryIds.Contains(c.Id))
          .ToListAsync();

      movie.Categories.AddRange(categories);

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

  [HttpPatch("{id}")]
  public async Task<IActionResult> UpdateMovieAsync(Guid id, [FromBody] JsonPatchDocument<MovieUpdateDTO> patchDoc)
  {
    var movie = await _context.Movies.Include(m => m.Categories).FirstOrDefaultAsync(m => m.Id == id);
    if (movie == null)
    {
      return NotFound();
    }

    // Map the existing movie to a DTO
    var movieDTO = _mapper.Map<MovieUpdateDTO>(movie);

    // Apply the patch to the DTO
    patchDoc.ApplyTo(movieDTO, error =>
    {
      ModelState.AddModelError(error.Operation.path, error.ErrorMessage);
    });

    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    // Validate the updated DTO
    var validator = new MovieUpdateDTOValidator(_context, id);
    var validationResult = await validator.ValidateAsync(movieDTO);

    if (!validationResult.IsValid)
    {
      foreach (var error in validationResult.Errors)
      {
        ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
      }
      return BadRequest(ModelState);
    }

    // Map the updated DTO back to the movie entity
    _mapper.Map(movieDTO, movie);

    // Clear existing categories and add the updated ones
    movie.Categories.Clear();
    if (movieDTO.CategoryIds != null && movieDTO.CategoryIds.Any())
    {
      var categories = await _context.Categories
          .Where(c => movieDTO.CategoryIds.Contains(c.Id))
          .ToListAsync();

      movie.Categories.AddRange(categories);
    }

    _context.Movies.Update(movie);
    await _context.SaveChangesAsync();

    return Ok(movie);
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
