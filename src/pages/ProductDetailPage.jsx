import { useState, useEffect } from "react";
import Constants from "../api/Constants";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const { title } = useParams();
  console.log("title@details = ", title);

  const dispatch = useDispatch();

  const handleClick = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${Constants.BASE_URL}/products?title=${title}`
        );
        const data = await response.json();
        setProduct(data);
        console.log("product-details = ", data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [title]);

  return (
    <div className="flex p-6 shadow-md">
      {product &&
        product.map((productItem) => (
          <div className="flex" key={productItem.id}>
            <div className="flex-shrink-0 w-1/2">
              <img
                src={productItem.images}
                alt={productItem.title}
                className="w-full h-auto rounded-md"
              />
            </div>

            <div className="flex-1 p-4">
              <h1 className="text-2xl font-bold mb-4">{productItem.title}</h1>
              <p className="text-gray-600 mb-4">{productItem.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold mr-2">
                  ${productItem.price}
                </span>
                <span className="text-gray-500">USD</span>
              </div>
              <button
                onClick={() => handleClick(productItem)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductDetailsPage;
