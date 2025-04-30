import React, { useEffect, useState } from "react";
import { FiPlus, FiArrowRight, FiDelete } from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import AddRecomendedModel from "./model/AddRecomendedmodel";
import { delete_recomended_api, get_recomended } from "../../controllers/Network/Featcher";
import { DeleteIcon, Trash } from "lucide-react";
import { FcDeleteDatabase } from "react-icons/fc";
import { LuDelete } from "react-icons/lu";

export default function Recomended() {
  const [recommendedProducts, setRecommendedProducts] = useState(null);
  const [isModelOpen, setisModelOpen] = useState(false);

  const fetchRecommendedProducts = () => {
    get_recomended()
      .then((res) => {
        console.log(res.data);
        setRecommendedProducts(res.data.recomended);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const delete_recomended = (id) => {
    delete_recomended_api({ productId: id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRecommendedProducts();
  }, []);

  return (
    <div className="p-6">
      <AddRecomendedModel
        isOpen={isModelOpen}
        onClose={() => setisModelOpen(false)}
      />
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Recommended Products", href: null }]} />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Recommended Products
            </h1>
            <button
              onClick={() => setisModelOpen(true)}
              className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </div>
        </div>
{
  recommendedProducts&&<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Product
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Stock
          </th>

          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              {/* Product */}
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                  <img
                    className="h-full w-full object-cover"
                    src={
                      product.product?.images?.[0] ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product.product.title}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {product.product.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-xs">
                    ID: {product.product._id}
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    ₹
                    {product.product.discountedPrice?.toFixed(2) ||
                      product.product.price.toFixed(2)}
                  </span>
                  {product.product.discountedPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ₹{product.product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </td>

              {/* Stock */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.product.stock}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-right flex justify-end gap-3">
                <Trash
                  onClick={() => {
                    delete_recomended(product._id);
                  }}
                  color="red"
                  className="p-2 w-8 h-8 rounded-full hover:bg-red-300"
                />
                <Link
                  to={`/products/product_detail/${product.product._id}`}
                  className="text-indigo-600 rounded-md transition-colors flex justify-end items-center gap-2"
                  title="View Details"
                >
                  More <FiArrowRight className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-8 text-gray-500">
              No Recommended Products Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
}
        {/* Products Table */}
        
      </div>
    </div>
  );
}
