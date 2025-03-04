using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.DTOs;

namespace MoviesAPI.Validation.CategoryValidation;

public class CategoryDTOValidator : AbstractValidator<CategoryDTO>
{
  private readonly DataContext _context;

  public CategoryDTOValidator(DataContext context)
  {
    _context = context;

    RuleFor(x => x.Id).MustAsync(async (id, cancellation) =>
    {
      var exists = await _context.Categories.AnyAsync(c => c.Id == id);
      return exists;
    }).WithMessage("Category must exist.");
  }
}
