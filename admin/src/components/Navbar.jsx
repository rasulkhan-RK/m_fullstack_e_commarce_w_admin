/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { assets } from "../assets/assets/assets.js";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    toast.success("Loged out");
    setTimeout(() => {
      setToken("");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <img className=" w-[150px] md:w-[240px]" src={assets.wave} alt="logo" />
      <button
        className="bg-gray-600 hover:bg-red-500 hover:text-white duration-300 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
