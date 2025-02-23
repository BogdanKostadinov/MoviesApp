using MoviesAPI.Models;

namespace MoviesAPI.Data.Mock_Data;

public class CategoryData
{
  public static List<Category> SeedCategories()
  {
    return new List<Category>
        {
            new Category
            {
                Id = new Guid("d3e39d5e-3e4b-6d8a-9d3e-3e4b6d8a9d3e"),
                Name = "Action"
            },
            new Category
            {
                Id = new Guid("e4f49d5e-4f4b-7e8a-9e4e-4f4b7e8a9e4e"),
                Name = "Science Fiction"
            }
        };
  }
}
