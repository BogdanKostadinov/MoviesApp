using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Models;

namespace MoviesAPI.Mappings;

public class MovieProfile : Profile
{
  public MovieProfile()
  {
    // MovieCreateDTO to Movie
    CreateMap<MovieCreateDTO, Movie>()
        .ForMember(dest => dest.Categories, opt => opt.Ignore());

    // Movie to MovieCreateDTO
    CreateMap<Movie, MovieCreateDTO>()
        .ForMember(dest => dest.CategoryIds, opt => opt.MapFrom(src => src.Categories.Select(c => c.Id).ToList()));

    // MovieUpdateDTO to Movie
    CreateMap<MovieUpdateDTO, Movie>()
        .ForMember(dest => dest.Categories, opt => opt.Ignore());

    // Movie to MovieUpdateDTO
    CreateMap<Movie, MovieUpdateDTO>()
        .ForMember(dest => dest.CategoryIds, opt => opt.MapFrom(src => src.Categories.Select(c => c.Id).ToList()));

    // Movie to MovieDTO
    CreateMap<Movie, MovieDTO>()
        .ForMember(dest => dest.CategoryIds, opt => opt.MapFrom(src => src.Categories.Select(c => c.Id).ToList()));

    // MovieDTO to Movie
    CreateMap<MovieDTO, Movie>()
        .ForMember(dest => dest.Categories, opt => opt.Ignore());
  }
}
