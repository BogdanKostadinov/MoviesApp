using MoviesAPI.Models;

namespace MoviesAPI.Data.Mock_Data;

public class UserData
{
  public static List<User> SeedUsers()
  {
    var userId1 = new Guid("a1e29d5e-1c4b-4b8a-9b1e-1c4b4b8a9b1e");
    var userId2 = new Guid("b2f29d5e-2d4b-5c8a-9c2e-2d4b5c8a9c2e");

    return new List<User>
        {
            new User
            {
                Id = userId1,
                FirstName = "Admin",
                LastName = "Admin",
                Username = "admin",
                Password = "admin"
            },
            new User
            {
                Id = userId2,
                FirstName = "John",
                LastName = "Doe",
                Username = "johndoe",
                Password = "password"
            }
        };
  }
}
