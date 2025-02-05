import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets/assets.js";
import { useContext, useState } from "react";
import { ShopContext } from "./context/ShopContext.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItem,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    toast.success("Logged Out👍🏻");
    setToken("");
    setCartItem({});
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium relative">
        <Link to="/">
          <img src={assets.wave} className="w-44 cursor-pointer" alt="logo" />
        </Link>
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink
            to="/"
            className="flex flex-col items-center text-white gap-1"
          >
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </NavLink>

          <NavLink
            to="/collection"
            className="flex flex-col items-center text-white gap-1 "
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden  " />
          </NavLink>

          <NavLink
            to="/about"
            className="flex flex-col items-center text-white gap-1 "
          >
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden " />
          </NavLink>

          <NavLink
            to="/contact"
            className="flex flex-col items-center text-white gap-1"
          >
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-white hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center  gap-2">
          <div className="hover:bg-white p-2 rounded-full">
            <img
              onClick={() => setShowSearch(true)}
              className="w-5 cursor-pointer"
              src={assets.search_icon}
              alt="search_icon"
            />
          </div>

          <div className="group relative hover:bg-white p-2 rounded-full ">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="profile_icon"
            />

            {/* DropDown */}
            {token && (
              <div className="pt-4 group-hover:block hidden absolute dropdown-menu right-0">
                <div className="flex flex-col w-36 py-3 px-5 rounded-lg bg-slate-200 text-gray-700">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={logout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative hover:bg-white p-2 rounded-full">
            <img
              src={assets.cart_icon}
              alt="cart_icon"
              className="w-5 min-w-5"
            />
            <p className="absolute right-[-2px] bottom-[-0px] w-4 text-center leading-4 bg-white font-bold text-black aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          <div
            className="hover:bg-white p-2 rounded-full sm:hidden"
            onClick={() => setVisible(true)}
          >
            <img
              src={assets.menu_icon}
              className="w-5 cursor-auto sm:hidden"
              alt="menu_icon"
            />
          </div>
        </div>
        {/* Sidebar Menu for small devices */}
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center p-3 gap-4 cursor-pointer"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt="dropdown_icon"
              />
              <p>Back</p>
            </div>
            <NavLink
              className="py-2 pl-6 border"
              to="/"
              onClick={() => setVisible(false)}
            >
              HOME
            </NavLink>
            <NavLink
              className="py-2 pl-6 border"
              to="/collection"
              onClick={() => setVisible(false)}
            >
              COLLECTION
            </NavLink>
            <NavLink
              className="py-2 pl-6 border"
              to="/about"
              onClick={() => setVisible(false)}
            >
              ABOUT
            </NavLink>
            <NavLink
              className="py-2 pl-6 border"
              to="/contact"
              onClick={() => setVisible(false)}
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
