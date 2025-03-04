using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.DTOs;

namespace MoviesAPI.Validation.MovieValidation;

public class CategoryCreateDTOValidator : AbstractValidator<CategoryCreateDTO>
{
  private readonly DataContext _context;
  public CategoryCreateDTOValidator(DataContext context)
  {
    _context = context;

    RuleFor(x => x.Name)
        .NotEmpty().WithMessage("Name is required")
        .Length(1, 100).WithMessage("Name must be between 1 and 100 characters")
        .MustAsync(HaveUniqueName).WithMessage("A category with this name already exists");
  }

  private async Task<bool> HaveUniqueName(string name, CancellationToken cancellationToken)
  {
    return !await _context.Categories
        .AnyAsync(c => c.Name == name, cancellationToken);
  }
}
