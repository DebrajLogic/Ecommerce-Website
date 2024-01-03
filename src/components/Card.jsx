/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button } from "../components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";

const Card = ({ id, title, price, images }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === id);

  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      const product = {
        id,
        title,
        price,
        images,
      };
      dispatch(addToFavorites(product));
    }
  };

  const handleClick = () => {
    const product = {
      id,
      title,
      price,
      images,
    };

    if (isInCart) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <>
      <div className="relative shadow-md rounded-md hover:bg-gray-100 mx-2">
        <div className="absolute top-2 right-2 z-10">
          <div
            onClick={handleToggleFavorite}
            className="bg-white p-1 rounded-full hover:bg-gray-200"
          >
            {isFavorite ? (
              <FavoriteIcon className="w-6 h-6 text-red-500" />
            ) : (
              <FavoriteBorderOutlinedIcon className="w-6 h-6 text-red-500" />
            )}
          </div>
        </div>

        <Link to={`/product-details/${title}`}>
          <img
            src={images[0]}
            alt={title}
            className="w-full h-48 object-cover rounded-t-md border-b border-l border-r border-gray-300"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 text-sm mt-2">{`$${price}`}</p>
          </div>
        </Link>

        <div className="p-4">
          <div className="mt-4">
            <Button
              onClick={handleClick}
              className={`${
                isInCart ? "bg-red-500 hover:bg-red-600" : "bg-blue-500"
              } text-white hover:bg-blue-700 w-full`}
            >
              <div className="flex items-center justify-center">
                {isInCart ? (
                  <>
                    <DeleteOutlinedIcon className="w-5 h-5 mr-2" />
                    Remove from Cart
                  </>
                ) : (
                  <>
                    <ShoppingCartOutlinedIcon className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
