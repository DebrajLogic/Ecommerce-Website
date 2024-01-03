import { useEffect, useState } from "react";
import { Card } from "../components"; // Import your Card component
import Constants from "../api/Constants";
import { useParams } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  const { id } = useParams();
  const productId = Number(id);
  console.log("id = ", productId);

  const filteredProducts = products.filter((product) =>
    productId !== 0 ? product.category.id === productId : true
  );

  console.log("filteredProducts = ", filteredProducts);
  useEffect(() => {
    fetch(`${Constants.BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log("data = ", data[0]);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="mt-8 grid md:grid-cols-2  xl:grid-cols-3 gap-2 lg:gap-6 items-start max-w-6xl px-4 mx-auto py-6">
      {filteredProducts.map(
        (product) => product.images[2] && <Card key={product.id} {...product} />
      )}
    </div>
  );
}

export default Home;
