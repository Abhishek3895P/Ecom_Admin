import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiGrid, 
  FiShoppingBag, 
  FiPackage,
  FiUsers,
  FiBarChart2,
  FiClock,
  FiPlusSquare,
  FiFolder,
  FiHelpCircle
} from "react-icons/fi";
import { GrProductHunt } from 'react-icons/gr';
import { PiFlagBanner } from 'react-icons/pi';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiHome size={18} />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FiGrid size={18} />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <FiPackage size={18} />,
    },  {
      name: "Recomended",
      path: "/recomended",
      icon: <GrProductHunt size={18} />,
    }, {
      name: "Banners",
      path: "/banners",
      icon: <PiFlagBanner size={18} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FiShoppingBag size={18} />,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <FiUsers size={18} />,
    },
    // {
    //   name: "Analytics",
    //   path: "/analytics",
    //   icon: <FiBarChart2 size={18} />,
    // },
    // {
    //   name: "Inventory",
    //   path: "/inventory",
    //   icon: <FiFolder size={18} />,
    // },
    {
      name: "Support",
      path: "/support",
      icon: <FiHelpCircle size={18} />,
    }
  ];

  return (
    <aside className="bg-white border-r border-gray-100  sticky overflow-scroll scrollbar-none ">
      <div className="p-4">
       
        
        <nav className="space-y-1">
          {links.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${
                  location.pathname === item.path 
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <span className={`mr-3 ${
                location.pathname === item.path ? "text-indigo-600" : "text-gray-400"
              }`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}