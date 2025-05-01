
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiLogOut, 
  FiMenu,
  FiBell,
  FiChevronDown
} from "react-icons/fi";
import { 
  RiDashboardLine,
  RiShoppingBagLine
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Get_category } from "../controllers/Network/Featcher";
import { set_Category } from "../store/counterSlice";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Categoryredux = useSelector((state) => state.counter.Category);

  const handleLogout = () => {
    const result = confirm("Are you sure you want to log out?");
    if (result) {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
      navigate("/");
    }
  };

  const loadData = () => {
    Get_category()
      .then((res) => {
        dispatch(set_Category(res.data.category));
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (Categoryredux.length === 0) {
      loadData();
    }
  }, []);

  return (
    <nav className="col-span-2 flex justify-between  bg-white border-b border-gray-200  px-8 ">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleSidebar}
            className="p-1 text-gray-500 hover:text-indigo-600 focus:outline-none lg:hidden"
          >
            <FiMenu size={20} />
          </button>
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-600 text-white">
              <RiShoppingBagLine size={18} />
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-800 hidden sm:inline">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search anything..."
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm placeholder-gray-400 transition duration-150"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden p-1 text-gray-500 hover:text-indigo-600">
            <FiSearch size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-1 text-gray-500 hover:text-indigo-600 relative">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2 pl-2 border-l border-gray-200 ml-2">
            <div className="relative">
              <img
                className="w-8 h-8 rounded-full object-cover border-2 border-indigo-100"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Admin"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <FiChevronDown className="text-gray-500 hidden md:block" />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      
    
    </nav>
  );
}