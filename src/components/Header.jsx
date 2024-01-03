import { Link } from "react-router-dom";
import { Button, Logo, Navbar } from "../components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("AuthStatus = ", isAuthenticated);
  const dispatch = useDispatch();

  return (
    <>
      <header className="bg-white sticky top-0 z-50 flex items-center justify-between py-2 px-6 shadow-md">
        <Link to="/" className="flex items-center gap-4 space-x-2">
          <Logo className="mr-4" />
          <HomeOutlinedIcon className=" scale-125 text-gray-500 shadow-sm hover:bg-gray-100" />
        </Link>
        <Link to="/"></Link>
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <Link to="/login">
              <Button className={"hover:bg-gray-200"}>
                <span className="font-bold">Login</span>
                <br />
                or Signup
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button onClick={() => dispatch(logout())}>
                <span className="font-bold">Logout</span>
              </Button>
            </Link>
          )}
          <Link to="/favorites">
            <div className="bg-white p-1 shadow-md border border-gray-200  rounded-md hover:bg-gray-200">
              <FavoriteBorderOutlinedIcon className="w-6 h-6 text-red-500" />
            </div>
          </Link>
          <Link
            to="/cart"
            className="flex items-center p-2 rounded-lg space-x-2 hover:bg-gray-200"
          >
            <ShoppingCartOutlinedIcon className="text-gray-700" size={20} />
            {cartItemCount > 0 && (
              <span className="text-white px-1 bg-pink-500 rounded-full h-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </header>
      <Navbar />
    </>
  );
}

export default Header;
