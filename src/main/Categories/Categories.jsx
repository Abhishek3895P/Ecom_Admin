import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiImage } from "react-icons/fi";
import AddCategoryModal from "./Models/AddCategoryModal";
import { Get_category } from "../../controllers/Network/Featcher";
import { useDispatch, useSelector } from "react-redux";
import { set_Category } from "../../store/counterSlice";
import Breadcrumb from "../../components/Breadcrumb";
import EditCategoryModel from "./Models/EditCategoryModel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModelEditOpen, setIsModelEditOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState({});
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.counter.Category);

  const loadData = () => {
    setLoading(true);
    Get_category()
      .then((res) => {
        dispatch(set_Category(res.data.category));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (categories.length === 0) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Breadcrumb items={[{ label: "Categories", href: null }]} />
      
      <AddCategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadData}
      />
      
      {isModelEditOpen && (
        <EditCategoryModel
          categoryToEdit={categoryToEdit}
          isOpen={isModelEditOpen}
          onClose={() => setIsModelEditOpen(false)}
          onSuccess={loadData}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mt-3">Categories</h1>
            <p className="text-gray-500 mt-1">Manage your product categories</p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg shadow transition-colors mt-4 md:mt-0"
          >
            <FiPlus className="mr-2" />
            Add Category
          </button>
        </div>

        {/* Categories Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <Skeleton circle width={48} height={48} className="mr-4" />
                      <div>
                        <Skeleton width={150} height={20} />
                        <Skeleton width={100} height={16} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Skeleton width={80} height={20} />
                      <Skeleton width={80} height={20} />
                      <Skeleton width={30} height={30} circle />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No categories found</h3>
              <p className="mt-1 text-gray-500">Get started by creating a new category</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Category
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            {category.image ? (
                              <img
                                className="h-full w-full object-cover"
                                src={category.image}
                                alt={category.name}
                              />
                            ) : (
                              <FiImage className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {category._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                          {category.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(category.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setCategoryToEdit(category);
                              setIsModelEditOpen(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-md hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </button>
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