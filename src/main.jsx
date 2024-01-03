import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

import { AuthLayout } from "./components";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import FavouritesPage from "./pages/FavoritesPage";
import ProdcutDetailPage from "./pages/ProductDetailPage";
import OrderSuccessfulPage from "./pages/OrderSuccessfulPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CategoryPage />,
      },
      {
        path: "/:id",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/cart",
        element: (
          <AuthLayout authentication={true}>
            <CartPage />,
          </AuthLayout>
        ),
      },
      {
        path: "/favorites",
        element: (
          <AuthLayout authentication={true}>
            <FavouritesPage />,
          </AuthLayout>
        ),
      },
      {
        path: "/product-details/:title",
        element: <ProdcutDetailPage />,
      },

      {
        path: "/success",
        element: <OrderSuccessfulPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
