import React, { useEffect, useState } from "react";
import { FiPlus, FiArrowRight, FiTrash2 } from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import AddRecomendedModel from "./model/AddRecomendedmodel";
import { delete_recomended_api, get_recomended } from "../../controllers/Network/Featcher";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Recomended() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRecommendedProducts = () => {
    setLoading(true);
    get_recomended()
      .then((res) => {
        setRecommendedProducts(res.data.recomended || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const deleteRecommended = (id) => {
    if (window.confirm("Are you sure you want to remove this recommended product?")) {
      delete_recomended_api({ productId: id })
        .then((res) => {
          if (res.data.success) {
            fetchRecommendedProducts();
          }
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    fetchRecommendedProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AddRecomendedModel
        isOpen={isModelOpen}
        onClose={() => {
          fetchRecommendedProducts();
          setIsModelOpen(false);
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb items={[{ label: "Recommended Products", href: null }]} />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Recommended Products</h1>
              <p className="text-gray-500 mt-1">Featured products that appear as recommendations</p>
            </div>
            <button
              onClick={() => setIsModelOpen(true)}
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg shadow transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <Skeleton circle width={40} height={40} className="mr-4" />
                      <div>
                        <Skeleton width={150} height={20} />
                        <Skeleton width={100} height={16} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Skeleton width={80} height={20} />
                      <Skeleton width={80} height={20} />
                      <Skeleton width={30} height={30} circle />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : recommendedProducts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No recommended products</h3>
              <p className="mt-1 text-gray-500">Add products to feature them as recommendations</p>
              <button
                onClick={() => setIsModelOpen(true)}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Recommended Product
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recommendedProducts.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                            <img
                              className="h-full w-full object-cover"
                              src={item.product?.images?.[0] || "https://via.placeholder.com/150"}
                              alt={item.product?.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product?.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {item.product?._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            ₹{item.product?.discountedPrice?.toFixed(2) || item.product?.price?.toFixed(2)}
                          </span>
                          {item.product?.discountedPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              ₹{item.product?.price?.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.product?.stock > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.product?.stock || 0} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => deleteRecommended(item._id)}
                            className="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                            title="Remove"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                          <Link
                            to={`/products/product_detail/${item.product?._id}`}
                            className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50 transition-colors flex items-center"
                            title="View Details"
                          >
                            <span className="mr-1">View</span>
                            <FiArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}