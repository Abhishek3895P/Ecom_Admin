import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiImage } from "react-icons/fi";
import AddCategoryModal from "./Models/AddCategoryModal";
import { Get_category } from "../../controllers/Network/Featcher";
import { useDispatch, useSelector } from "react-redux";
import { set_Category } from "../../store/counterSlice";
import Breadcrumb from "../../components/Breadcrumb";
import EditCategoryModel from "./Models/EditCategoryModel";

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModelEditOpen, setisModelEditOpen] = useState(false);
const [CategryToedit, setCategryToedit] = useState({})

  const dispacher = useDispatch();
  const Categoryredux = useSelector((state) => state.counter.Category);
  // Sample data with image URLs

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

  useEffect(() => {
    if (Categoryredux.length == 0) {
      loadData();
    }
  }, []);

  return (
    <div className="p-6  ">
      <Breadcrumb
        items={[
          { label: "Category", href: null }, // Current page (no link)
        ]}
      />
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {
        isModelEditOpen&& <EditCategoryModel
        CategryToedit={CategryToedit}
          isOpen={isModelEditOpen}
          onClose={() => setisModelEditOpen(false)}
        />
      }
     

      <div className=" mx-auto">
        {/* Header with gradient */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Categories
            </h1>
            <p className="text-gray-500">Manage your product categories</p>
          </div>

          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64 bg-white shadow-sm"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <FiPlus className="mr-2" />
              Add Category
            </button>
          </div>
        </div>

        {/* Categories Card Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Products
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Categoryredux.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          {category.image ? (
                            <img
                              className="h-full w-full object-cover"
                              src={category.image}
                              alt={category.name}
                            />
                          ) : (
                            <FiImage className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {category.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {category._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.slug}
                      </div>
                      <div className="text-xs text-gray-400">products</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                         bg-gray-100 text-gray-700"
                        }`}
                      >
                        {new Date(category.updatedAt).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button onClick={()=>{
                          setCategryToedit(category)
                          setisModelEditOpen(true)
                        }} className="text-indigo-500 hover:text-indigo-700 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
        </div>
      </div>
    </div>
  );
}
