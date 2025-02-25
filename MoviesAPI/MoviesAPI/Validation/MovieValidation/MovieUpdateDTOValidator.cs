using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.DTOs.Movie;

namespace MoviesAPI.Validation.MovieValidation;

public class MovieUpdateDTOValidator : AbstractValidator<MovieUpdateDTO>
{
  private readonly DataContext _context;
  public MovieUpdateDTOValidator(DataContext context)
  {
    _context = context;

    RuleFor(x => x.Title)
        .NotEmpty().WithMessage("Title is required")
        .Length(1, 100).WithMessage("Title must be between 1 and 100 characters")
        .MustAsync(HaveUniqueTitle).WithMessage("A movie with this name already exists");

    RuleFor(x => x.Director)
        .NotEmpty().WithMessage("Director is required")
        .Length(1, 100).WithMessage("Director must be between 1 and 100 characters");

    RuleFor(x => x.Genre)
        .NotEmpty().WithMessage("Genre is required")
        .Length(1, 200).WithMessage("Genre must be between 1 and 200 characters");

    RuleFor(x => x.ReleaseYear)
        .InclusiveBetween(1888, DateTime.Now.Year + 1)
        .WithMessage($"Release year must be between 1888 and {DateTime.Now.Year + 1}");
  }
  private async Task<bool> HaveUniqueTitle(string title, CancellationToken cancellationToken)
  {
    return !await _context.Movies
        .AnyAsync(c => c.Title == title, cancellationToken);
  }
}
