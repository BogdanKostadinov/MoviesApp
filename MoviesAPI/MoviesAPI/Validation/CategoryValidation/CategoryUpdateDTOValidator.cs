using FluentValidation;
using MoviesAPI.Data;
using MoviesAPI.DTOs;

namespace MoviesAPI.Validation.CategoryValidation;

public class CategoryUpdateDTOValidator : AbstractValidator<CategoryUpdateDTO>
{
  private readonly DataContext _context;

  public CategoryUpdateDTOValidator(DataContext context)
  {
    _context = context;

    RuleFor(dto => dto.Name)
        .NotEmpty().WithMessage("Category name is required.")
        .MaximumLength(100).WithMessage("Category name cannot exceed 100 characters.");

    RuleFor(dto => dto.MovieIds)
        .Must(HaveValidMovieIds).WithMessage("One or more movie IDs are invalid.");
  }

  private bool HaveValidMovieIds(CategoryUpdateDTO dto, List<Guid>? movieIds)
  {
    if (movieIds == null || !movieIds.Any())
    {
      return true;
    }

    return _context.Movies.Any(m => movieIds.Contains(m.Id));
  }
}
