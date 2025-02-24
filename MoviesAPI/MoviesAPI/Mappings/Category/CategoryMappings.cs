using AutoMapper;
using MoviesAPI.DTOs.Category;
using MoviesAPI.Models;

namespace MoviesAPI.Mappings;

public class CategoryMappings : Profile
{
  public CategoryMappings()
  {
    CreateMap<Category, CategoryDTO>();
    CreateMap<CategoryDTO, Category>();

    CreateMap<Category, CategoryCreateDTO>();
    CreateMap<CategoryCreateDTO, Category>();

    CreateMap<Category, CategoryUpdateDTO>();
    CreateMap<CategoryUpdateDTO, Category>();
  }
}
