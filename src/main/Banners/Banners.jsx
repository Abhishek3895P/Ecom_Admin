import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiImage } from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb";
import AddBannerModal from "./models/AddBannerModal";
import {
  delete_banner_api,
  Get_banner,
} from "../../controllers/Network/Featcher";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      delete_banner_api({ bannerid: id })
        .then(() => {
          setBanners(banners.filter((b) => b._id !== id));
        })
        .catch(console.error);
    }
  };

  const loaddata = () => {
    setLoading(true);
    Get_banner()
      .then((res) => {
        setBanners(res.data.banners);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AddBannerModal
        isOpen={isAddOpen}
        onClose={() => {
          loaddata();
          setIsAddOpen(false);
        }}
        onSuccess={(newBanner) => setBanners([...banners, newBanner])}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb items={[{ label: "Banners", href: null }]} />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Banner Management
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your website banners and promotions
              </p>
            </div>
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg shadow transition-colors duration-200"
            >
              <FiPlus className="mr-2" /> Add Banner
            </button>
          </div>
        </div>

        {/* Banner Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <Skeleton height={160} />
                <div className="p-4">
                  <Skeleton count={3} />
                </div>
              </div>
            ))}
          </div>
        ) : banners.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FiImage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No banners
            </h3>
            <p className="mt-1 text-gray-500">
              Get started by adding a new banner.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsAddOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Banner
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="p-2 bg-white rounded-full shadow text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {banner.idType === "category"
                          ? "Category Banner"
                          : "Product Banner"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Target ID: {banner.parentID}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {banner.idType}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>
                      Created: {new Date(banner.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
