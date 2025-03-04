using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.DTOs;
using MoviesAPI.Models;
using MoviesAPI.Validation.CategoryValidation;
using MoviesAPI.Validation.MovieValidation;

namespace MoviesAPI.Controllers;

[ApiController]
[Route("/categories")]
public class CategoryController : ControllerBase
{
  private readonly ILogger<CategoryController> _logger;
  private readonly DataContext _context;
  private readonly IMapper _mapper;

  public CategoryController(ILogger<CategoryController> logger, DataContext context, IMapper mapper)
  {
    _logger = logger;
    _context = context;
    _mapper = mapper;
  }

  [HttpGet]
  public async Task<IActionResult> GetCategoriesAsync()
  {
    var categories = await _context.Categories
        .Include(c => c.Movies)
        .ToListAsync();
    var categoriesDTOs = _mapper.Map<IEnumerable<CategoryDTO>>(categories);

    if (categoriesDTOs is null)
    {
      return NotFound();
    }

    return Ok(categoriesDTOs);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetCategoryAsync(Guid id)
  {
    var category = await _context.Categories
        .Include(c => c.Movies)
        .FirstOrDefaultAsync(c => c.Id == id);

    if (category == null)
    {
      return NotFound();
    }

    var categoryDTO = _mapper.Map<CategoryDTO>(category);
    return Ok(categoryDTO);
  }

  [HttpPost]
  public async Task<IActionResult> CreateCategoryAsync([FromBody] CategoryCreateDTO newCategory)
  {
    var validator = new CategoryCreateDTOValidator(_context);
    var validationResult = await validator.ValidateAsync(newCategory);

    if (!validationResult.IsValid)
    {
      validationResult.AddToModelState(ModelState);
      return BadRequest(ModelState);
    }

    try
    {
      var category = _mapper.Map<Category>(newCategory);
      category.Id = Guid.NewGuid();

      // Retrieve existing movies from the database
      var movies = await _context.Movies
          .Where(m => newCategory.MovieIds.Contains(m.Id))
          .ToListAsync();

      category.Movies.AddRange(movies);

      await _context.Categories.AddAsync(category);
      await _context.SaveChangesAsync();

      return Ok(category);
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error creating category");
      return StatusCode(500, "Internal server error");
    }
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateCategoryAsync(Guid id, [FromBody] CategoryUpdateDTO updateCategory)
  {
    var validator = new CategoryUpdateDTOValidator(_context);
    var validationResult = await validator.ValidateAsync(updateCategory);

    if (!validationResult.IsValid)
    {
      validationResult.AddToModelState(ModelState);
      return BadRequest(ModelState);
    }

    var category = await _context.Categories.Include(c => c.Movies).FirstOrDefaultAsync(c => c.Id == id);
    if (category == null)
    {
      return NotFound();
    }

    _mapper.Map(updateCategory, category);
    category.Movies.Clear();

    // Retrieve existing movies from the database
    var movies = await _context.Movies
        .Where(m => updateCategory.MovieIds.Contains(m.Id))
        .ToListAsync();

    category.Movies.AddRange(movies);

    _context.Categories.Update(category);
    await _context.SaveChangesAsync();

    return Ok(category);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteCategoryAsync(Guid id)
  {
    var category = await _context.Categories.FindAsync(id);
    if (category is not null)
    {
      _context.Categories.Remove(category);
      await _context.SaveChangesAsync();
      return Ok();
    }
    return NotFound();
  }
}
