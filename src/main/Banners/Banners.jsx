import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import Breadcrumb from "../../components/Breadcrumb";
import AddBannerModal from "./models/AddBannerModal";
import {
  delete_banner_api,
  Get_banner,
} from "../../controllers/Network/Featcher";
// import AddBannerModal from './AddBannerModal';
// import { Get_banners, Post_banner, Delete_banner } from '../../controllers/Network/Featcher';

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  //   const loadBanners = () => {
  //     Get_banners()
  //       .then(res => setBanners(res.data.data))
  //       .catch(err => console.error(err));
  //   };

  //   useEffect(() => { loadBanners(); }, []);

  //   const handleAdd = (newBanner) => {
  //     // call API
  //     Post_banner(newBanner)
  //       .then(() => loadBanners())
  //       .catch(err => console.error(err));
  //   };

  const handleDelete = (id) => {
    delete_banner_api({ bannerid: id })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    Get_banner()
      .then((res) => {
        console.log(res.data);
        setBanners(res.data.banners);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-6">
      <AddBannerModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

      <div className="mb-6">
        <Breadcrumb items={[{ label: "Banners", href: null }]} />
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Banner Management
          </h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg"
          >
            <FiPlus className="mr-2" /> Add Banner
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Parent ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {banners.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {b.parentID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {b.idType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-24 overflow-hidden rounded">
                      <img
                        src={b.image}
                        alt="banner"
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
