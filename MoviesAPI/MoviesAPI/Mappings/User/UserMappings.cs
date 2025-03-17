using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Models;

namespace MoviesAPI.Mappings;

public class UserProfile : Profile
{
  public UserProfile()
  {
    CreateMap<UserCreateDTO, User>();
    CreateMap<User, UserCreateDTO>();

    CreateMap<UserUpdateDTO, User>();
    CreateMap<User, UserUpdateDTO>();

    CreateMap<User, UserDTO>();
    CreateMap<UserDTO, User>();
  }
}
