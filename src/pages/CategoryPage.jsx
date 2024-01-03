import { useEffect, useState } from "react";
import { CategoryCard } from "../components";
import Constants from "../api/Constants";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${Constants.BASE_URL}/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Shop By Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {categories.map(
          (category) =>
            category.id < 6 && (
              <CategoryCard
                key={category.id}
                id={category.id}
                title={category.name}
                price={category.price}
                image={category.image}
              />
            )
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
