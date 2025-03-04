using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Models;

namespace MoviesAPI.Mappings;

public class CategoryMappings : Profile
{
  public CategoryMappings()
  {
    // Category to CategoryDTO
    CreateMap<Category, CategoryDTO>();

    // CategoryDTO to Category
    CreateMap<CategoryDTO, Category>();

    // CategoryCreateDTO to Category
    CreateMap<CategoryCreateDTO, Category>()
        .ForMember(dest => dest.Movies, opt => opt.Ignore());

    // Category to CategoryCreateDTO
    CreateMap<Category, CategoryCreateDTO>()
        .ForMember(dest => dest.MovieIds, opt => opt.MapFrom(src => src.Movies.Select(m => m.Id).ToList()));

    // CategoryUpdateDTO to Category
    CreateMap<CategoryUpdateDTO, Category>()
        .ForMember(dest => dest.Movies, opt => opt.Ignore());

    // Category to CategoryUpdateDTO
    CreateMap<Category, CategoryUpdateDTO>()
        .ForMember(dest => dest.MovieIds, opt => opt.MapFrom(src => src.Movies.Select(m => m.Id).ToList()));
  }
}
