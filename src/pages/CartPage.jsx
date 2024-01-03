import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../store/cartSlice";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateCartItemQuantity({ itemId, newQuantity }));
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const taxRate = 0.1;
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;

    return { subtotal, tax, grandTotal };
  };

  const { subtotal, tax, grandTotal } = calculateTotals();

  if (cartItems.length == 0) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Your Cart is Empty
            </h1>
            <p className="text-gray-500">
              Explore our products and find something you love.
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex p-6 flex-col md:flex-row">
        {/* Left side - Cart Items */}
        <div className="flex-1 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center mb-4 shadow-md rounded-md p-2 border border-gray-200"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{`Price: $${item.price}`}</p>
                <label className="text-gray-600">Quantity:</label>

                <select
                  className="bg-gray-200 px-1 rounded-xl mr-6 outline-none"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10);

                    handleQuantityChange(item.id, newQuantity);
                  }}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <button
                  className="text-red-500 ml-2 hover:bg-gray-200 rounded-md"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <DeleteOutlinedIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Total */}
        <div className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="mb-4">
            <p className="text-gray-700">{`Subtotal: $${subtotal.toFixed(
              2
            )}`}</p>
            <p className="text-gray-700">{`Tax (10%): $${tax.toFixed(2)}`}</p>
            <hr className="my-2" />
            <p className="text-2xl font-bold">{`Grand Total: $${grandTotal.toFixed(
              2
            )}`}</p>
          </div>
          <a href="/success">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Checkout
            </button>
          </a>
        </div>
      </div>
    );
  }
};

export default CartPage;
