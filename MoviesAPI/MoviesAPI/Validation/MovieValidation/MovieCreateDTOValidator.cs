using FluentValidation;
using MoviesAPI.DTOs.Movie;

namespace MoviesAPI.Validation.MovieValidation;

public class MovieCreateDTOValidator : AbstractValidator<MovieCreateDTO>
{
  public MovieCreateDTOValidator()
  {
    RuleFor(x => x.Title)
        .NotEmpty().WithMessage("Title is required")
        .Length(1, 100).WithMessage("Title must be between 1 and 100 characters");

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
}
