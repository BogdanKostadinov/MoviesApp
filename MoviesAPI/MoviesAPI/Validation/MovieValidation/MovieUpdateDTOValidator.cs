using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.DTOs;

namespace MoviesAPI.Validation.MovieValidation;

public class MovieUpdateDTOValidator : AbstractValidator<MovieUpdateDTO>
{
  private readonly DataContext _context;
  private readonly Guid _movieId;

  public MovieUpdateDTOValidator(DataContext context, Guid movieId)
  {
    _context = context;
    _movieId = movieId;

    RuleFor(x => x.Title)
        .MustAsync(HaveUniqueTitleIfProvided).WithMessage("A movie with this name already exists")
        .When(x => !string.IsNullOrEmpty(x.Title))
        .Length(1, 100).WithMessage("Title must be between 1 and 100 characters")
        .When(x => !string.IsNullOrEmpty(x.Title));

    RuleFor(x => x.Director)
        .Length(1, 100).WithMessage("Director must be between 1 and 100 characters")
        .When(x => !string.IsNullOrEmpty(x.Director));

    RuleFor(x => x.ReleaseYear)
        .InclusiveBetween(1888, DateTime.Now.Year + 1)
        .WithMessage($"Release year must be between 1888 and {DateTime.Now.Year + 1}")
        .When(x => x.ReleaseYear.HasValue);

    RuleFor(x => x.CategoryIds)
        .Must(HaveValidCategoryIds).WithMessage("One or more category IDs are invalid.")
        .When(x => x.CategoryIds != null && x.CategoryIds.Any());
  }

  private async Task<bool> HaveUniqueTitleIfProvided(string? title, CancellationToken cancellationToken)
  {
    // Allow the same title if it's the movie's current title
    return !await _context.Movies.AnyAsync(m => m.Title == title && m.Id != _movieId, cancellationToken);
  }

  private bool HaveValidCategoryIds(MovieUpdateDTO dto, List<Guid>? categoryIds)
  {
    if (categoryIds == null || !categoryIds.Any())
    {
      return true;
    }

    return _context.Categories.Any(c => categoryIds.Contains(c.Id));
  }
}
