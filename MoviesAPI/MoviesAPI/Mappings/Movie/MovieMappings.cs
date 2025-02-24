using AutoMapper;
using MoviesAPI.DTOs.Movie;
using MoviesAPI.Models;

namespace MoviesAPI.Mappings;

public class MovieProfile : Profile
{
  public MovieProfile()
  {
    CreateMap<Movie, MovieDTO>();
    CreateMap<MovieDTO, Movie>();

    CreateMap<Movie, MovieCreateDTO>();
    CreateMap<MovieCreateDTO, Movie>();

    CreateMap<Movie, MovieUpdateDTO>();
    CreateMap<MovieUpdateDTO, Movie>();
  }
}
