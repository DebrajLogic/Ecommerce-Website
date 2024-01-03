import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white p-4 shadow-md mt-0.5">
      <div className="flex justify-center">
        <NavLink
          to={`/${0}`}
          className={({ isActive }) =>
            isActive ? "text-pink-500 mr-6" : "hover:text-pink-500 mr-6"
          }
        >
          All
        </NavLink>
        <NavLink
          to={`/${1}`}
          className={({ isActive }) =>
            isActive ? "text-pink-500 mr-6" : "hover:text-pink-500 mr-6"
          }
        >
          Clothing
        </NavLink>
        <NavLink
          to={`/${2}`}
          className={({ isActive }) =>
            isActive ? "text-pink-500 mr-6" : "hover:text-pink-500 mr-6"
          }
        >
          Electronics
        </NavLink>
        <NavLink
          to={`/${3}`}
          className={({ isActive }) =>
            isActive ? "text-pink-500 mr-6" : "hover:text-pink-500 mr-6"
          }
        >
          Furniture
        </NavLink>
        <NavLink
          to={`/${4}`}
          className={({ isActive }) =>
            isActive ? "text-pink-500 mr-6" : "hover:text-pink-500 mr-6"
          }
        >
          Shoes
        </NavLink>
        <NavLink
          to={`/${5}`}
          className={({ isActive }) =>
            isActive ? "text-pink-500 mr-6" : "hover:text-pink-500 mr-6"
          }
        >
          Miscellaneous
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
