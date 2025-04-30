import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => {
  return (
    <div className="flex items-center text-sm font-medium mb-4">
      <Link to="/" className="text-indigo-600 hover:text-indigo-800 hover:underline">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center text-sm">
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          {item.href ? (
            <Link 
              to={item.href} 
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-600">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;