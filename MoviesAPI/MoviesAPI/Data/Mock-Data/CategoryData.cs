using MoviesAPI.Models.Category;

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
                Name = "Action",
                MovieId = new Guid("b1e29d5e-1c4b-4b8a-9b1e-1c4b4b8a9b1e")
            },
            new Category
            {
                Id = new Guid("e4f49d5e-4f4b-7e8a-9e4e-4f4b7e8a9e4e"),
                Name = "Science Fiction",
                MovieId = new Guid("c2f29d5e-2d4b-5c8a-9c2e-2d4b5c8a9c2e")
            }
        };
  }
}
