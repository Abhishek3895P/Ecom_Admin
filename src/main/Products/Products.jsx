import React, { useEffect, useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb";
import AddProductModal from "./models/AddProductmodel";
import { Get_category, Get_product } from "../../controllers/Network/Featcher";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoFilterSharp } from "react-icons/io5";

export default function Products() {
  // Sample product data - replace with your actual data


  const [page, setPage] = useState(1);
  const [total_item, settotal_item] = useState(0);
  const [totalPages, setTotalPages] = useState(1);


  const [isModelOpen, setisModelOpen] = useState(false);


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [Products, setProduct] = useState([])
 

  const [Category_filter, setCategory_filter] = useState(null);

  const Category_sdelect_handler = (event) => {
    if (event.target.value == 999999999) {
      setCategory_filter(null);
    } else {
      setCategory_filter(event.target.value);
    }
  };

  const dispacher = useDispatch();
  const Categoryredux = useSelector((state) => state.counter.Category);

  const handleDelete = (productId) => {
    // Delete logic here
    console.log("Deleting product:", productId);
    setIsDeleteModalOpen(false);
  };

  const loadData = () => {
    Get_category()
      .then((res) => {
        console.log(res.data);
        dispacher(set_Category(res.data.category));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{

    let filter=Category_filter==null?"":"?category="+Category_filter

    Get_product(filter).then(res=>{
      console.log(res)
      setProduct(res.data.data)
      setPage(res.data.pagination.currentPage)
      setTotalPages(res.data.pagination.totalPages)
      settotal_item(res.data.pagination.totalProducts)
    }).catch(err=>{
      console.log(err)
    })

    if (Categoryredux.length == 0) {
      loadData();
    }


  },[Category_filter])


  return (
    <div className="p-6 ">
      <AddProductModal
        isOpen={isModelOpen}
        onClose={() => setisModelOpen(false)}
      />

      <div className=" mx-auto">
        {/* Header with Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "All Products", href: null },
            ]}
          />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Product Management
            </h1>
            <div className="flex gap-3">
            <form class="flex gap-3 items-center">
              <IoFilterSharp />
              <select
                onChange={Category_sdelect_handler}
                id="underline_select"
                class="block cursor-pointer py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value={999999999} selected dissabled>
                  Choose a Category
                </option>
                <option value={999999999}>No Filter</option>
                {Categoryredux.map((item) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </select>
            </form>

            <button
              onClick={() => {
                console.log(true);
                setisModelOpen(true);
              }}
              className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <FiPlus className="mr-2" />
              Add Product
            </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Products.map((product) => (
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
                          <div className="text-sm font-medium text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            ID: {product._id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.category?.name || "Uncategorized"}
                      </div>
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
                      <div className="text-sm text-gray-900">
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
                      <div className="flex justify-end space-x-2 ">
                        <Link

to={"/products/product_detail/"+product._id}

                          className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-md hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                          title="View"
                        >
                           more <FiArrowRight className="h-4 w-4" />
                        </Link>
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div class=" bg-gray-50 px-8 py-2 flex items-center justify-between border-t border-gray-200">
          <span class="text-sm text-gray-700 ">
            Showing <span class=" text-gray-900 ">{page}</span> of{" "}
            <span class=" text-gray-900 ">{totalPages} Pages</span> (Total {total_item} Products)
          </span>

          <div class="inline-flex my-2 xs:mt-0">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              class="flex items-center justify-center px-3 h-8 text-sm font-medium  cursor-pointer rounded-s hover:bg-gray-200  border border-gray-300"
            >
              <svg
                class="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              class="flex items-center justify-center px-3 h-8 text-sm font-medium  cursor-pointer  border border-gray-300 hover:bg-gray-200  rounded-e"
            >
              Next
              <svg
                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
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
                <FiX className="h-5 w-5" />
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
