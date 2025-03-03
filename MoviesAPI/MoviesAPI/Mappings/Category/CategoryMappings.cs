using AutoMapper;
using MoviesAPI.DTOs.Categories;
using MoviesAPI.Models.Category;

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
