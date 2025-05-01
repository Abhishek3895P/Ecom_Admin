import React, { useEffect, useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiPlus,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
} from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb";
import AddProductModal from "./models/AddProductmodel";
import { Get_category, Get_product } from "../../controllers/Network/Featcher";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AmazonScraperModal from "./models/add_url_product_model";

export default function Products() {
  const [page, setPage] = useState(1);
  const [total_item, settotal_item] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModelOpen, setisModelOpen] = useState(false);
  const [isModelURLOpen, setisModelURLOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [Products, setProduct] = useState([]);
  const [Category_filter, setCategory_filter] = useState(null);
  const [loading, setLoading] = useState({
    products: false,
    categories: false,
    page: false,
  });

  const dispatch = useDispatch();
  const Categoryredux = useSelector((state) => state.counter.Category);

  const Category_sdelect_handler = (event) => {
    setCategory_filter(
      event.target.value === "999999999" ? null : event.target.value
    );
    setPage(1);
  };

  const loadData = () => {
    setLoading((prev) => ({ ...prev, categories: true }));
    Get_category()
      .then((res) => {
        dispatch(set_Category(res.data.category));
      })
      .catch(console.error)
      .finally(() => setLoading((prev) => ({ ...prev, categories: false })));
  };

  const loadProducts = () => {
    let filter = `?page=${page}&limit=20`;
    if (Category_filter != null) filter += `&category=${Category_filter}`;

    setLoading((prev) => ({ ...prev, products: true, page: true }));
    Get_product(filter)
      .then((res) => {
        setProduct(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        settotal_item(res.data.pagination.totalProducts);
      })
      .catch(console.error)
      .finally(() =>
        setLoading((prev) => ({ ...prev, products: false, page: false }))
      );

    if (Categoryredux.length === 0) {
      loadData();
    }
  };

  useEffect(() => {
    loadProducts();
  }, [Category_filter, page]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AmazonScraperModal
        isOpen={isModelURLOpen}
        onClose={() => {
          loadProducts();
          setisModelURLOpen(false);
        }}
      />
      <AddProductModal
        isOpen={isModelOpen}
        onClose={() => {
          loadProducts();
          setisModelOpen(false);
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Breadcrumb items={[{ label: "All Products", href: null }]} />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Product Management
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your product inventory
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400" />
                </div>
                {loading.categories ? (
                  <div className="block w-full pl-10 pr-3 py-2.5 text-sm bg-gray-200 animate-pulse rounded-lg h-[42px]"></div>
                ) : (
                  <select
                    onChange={Category_sdelect_handler}
                    className="block w-full pl-10 pr-3 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                    defaultValue="999999999"
                    disabled={loading.categories}
                  >
                    <option value="999999999" disabled>
                      Filter by Category
                    </option>
                    <option value="999999999">All Categories</option>
                    {Categoryredux.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button
                onClick={() => setisModelURLOpen(true)}
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg shadow transition-colors duration-200 disabled:opacity-70"
                disabled={loading.products}
              >
                {loading.products ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <>
                    <FiPlus className="mr-2" />
                    Add Product (URL)
                  </>
                )}
              </button>
              <button
                onClick={() => setisModelOpen(true)}
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg shadow transition-colors duration-200 disabled:opacity-70"
                disabled={loading.products}
              >
                {loading.products ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <>
                    <FiPlus className="mr-2" />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {loading.products ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 animate-pulse h-20"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{total_item}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Showing Active Products</p>
              <p className="text-2xl font-bold text-gray-800">
                {Products.filter((p) => p.status === "active").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-800">
                {Categoryredux.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">Current Page</p>
              <p className="text-2xl font-bold text-gray-800">
                {page} of {totalPages}
              </p>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading.products ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Product",
                        "Category",
                        "Price",
                        "Stock",
                        "Status",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Products.length > 0 ? (
                      Products.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {/* Product Column */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                                <img
                                  className="h-full w-full object-cover"
                                  src={
                                    product.images[0] ||
                                    "https://via.placeholder.com/150"
                                  }
                                  alt={product.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                  {product.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {product._id}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category Column */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                              {product.category?.name || "Uncategorized"}
                            </span>
                          </td>

                          {/* Price Column */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                ₹
                                {product.discountedPrice?.toFixed(2) ||
                                  product.price.toFixed(2)}
                              </span>
                              {product.discountedPrice && (
                                <span className="text-xs text-gray-500 line-through">
                                  ₹{product.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Stock Column */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm ${
                                product.stock < 10
                                  ? "text-red-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {product.stock}
                            </div>
                          </td>

                          {/* Status Column */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                product.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {product.status.charAt(0).toUpperCase() +
                                product.status.slice(1)}
                            </span>
                          </td>

                          {/* Actions Column */}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link
                                to={`/products/product_detail/${product._id}`}
                                className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50 transition-colors flex items-center"
                                title="View Details"
                              >
                                <FiArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200">
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{page}</span> of{" "}
                    <span className="font-medium">{totalPages}</span> (
                    {total_item} products)
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    disabled={page === 1 || loading.page}
                    onClick={() => setPage(page - 1)}
                    className={`flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm ${
                      page === 1 || loading.page
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiChevronLeft className="mr-1" /> Previous
                  </button>
                  <button
                    disabled={page === totalPages || loading.page}
                    onClick={() => setPage(page + 1)}
                    className={`flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm ${
                      page === totalPages || loading.page
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Next <FiChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Delete Product
              </h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedProduct?.title}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedProduct?._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
