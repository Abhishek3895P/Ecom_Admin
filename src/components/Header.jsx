import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdLogOut } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate();

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

  return (
    <nav className="col-span-2 flex justify-between bg-indigo-700 items-center shadow-sm text-white px-4 ">
      {/* Left Side - Branding */}
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-semibold flex items-center">
          <span className="bg-white text-indigo-700 px-2 py-0.5 rounded-md mr-1.5 text-sm">
            PG
          </span>
          <span className="hidden sm:inline">Ecommerce</span>
        </h1>
      </div>

      {/* Right Side - Navigation Items */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <IoMdSearch
            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-indigo-200"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-indigo-600 text-white placeholder-indigo-300 rounded-full py-1.5 pl-8 pr-3  w-48 text-sm"
          />
        </div>

        {/* Mobile Search */}
        <button className="md:hidden p-1 text-indigo-100 hover:text-white">
          <IoMdSearch size={20} />
        </button>

        {/* Notifications */}
        <button className="relative p-1 text-indigo-100 hover:text-white">
          <IoNotificationsOutline size={20} />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="border border-white rounded-full">
              <img
                className="w-7 h-7 rounded-full object-cover"
                src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                alt="Admin"
              />
            </div>
            <div className="mr-2 text-left pl-2 hidden sm:block">
              <p className="font-medium text-sm">@pg_admin</p>
              <p className="text-xs text-indigo-200">Admin</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-1 text-indigo-100 hover:text-white hover:bg-indigo-600 rounded-full transition-colors"
          title="Logout"
        >
          <IoMdLogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
