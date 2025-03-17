namespace MoviesAPI.DTOs;

public class UserCreateDTO
{
  public required string Username { get; set; }
  public required string Password { get; set; }
  public required string FirstName { get; set; }
  public required string LastName { get; set; }
}
