import { Link } from "react-router-dom";

const OrderSuccessfulPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-3xl text-green-700 font-bold mb-4">
          Order Successful!
        </h2>
        <p className="text-gray-700 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <Link to="/0">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessfulPage;
