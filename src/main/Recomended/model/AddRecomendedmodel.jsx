import React, { useRef } from "react";
import { FiX } from "react-icons/fi";
import { post_recomended } from "../../../controllers/Network/Featcher";
// import your network function for adding recommendation
// import { Post_recommended } from '../../../controllers/Network/Featcher';

export default function AddRecomendedModel({ isOpen, onClose }) {
  if (!isOpen) return null;
  const idRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productId = idRef.current.value.trim();
    if (!productId) return;

    try {
      post_recomended({ ID: productId })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      onClose();
    } catch (err) {
      console.error("Failed to add recommended product", err);
    }
  };

  const handleCancel = () => {
    if (idRef.current) idRef.current.value = "";
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Recommended
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product ID *
            </label>
            <input
              id="productId"
              name="productId"
              type="text"
              ref={idRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product ID"
              required
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
