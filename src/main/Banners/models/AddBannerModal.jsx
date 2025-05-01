import React, { useState, useRef } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import { Post_banner } from "../../../controllers/Network/Featcher";
import Loading_svg from "../../../components/Loading_svg";

export default function AddBannerModal({ isOpen, onClose }) {
  const [parentID, setParentID] = useState("");
  const [idType, setIdType] = useState("product");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const [loading, setloading] = useState(false);
  const [errormsh, seterrormsh] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    seterrormsh(null);
    if (!parentID || !idType || !imageFile) return;
    const formData = new FormData();
    formData.append("parentID", parentID);
    formData.append("idType", idType);
    formData.append("image", imageFile);

    console.log(formData);

    Post_banner(formData)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setloading(false);
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        seterrormsh("Opps, Something went Wrong.");
      });

  };

  const handleCancel = () => {
    setParentID("");
    setIdType("product");
    setImageFile(null);
    setPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add Banner</h2>
          {errormsh && <p className="text-sm">{errormsh}</p>}
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent ID *
            </label>
            <input
              type="text"
              value={parentID}
              onChange={(e) => setParentID(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter parent ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type *
            </label>
            <select
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="product">Product</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Image *
            </label>
            <div
              onClick={() => fileInputRef.current.click()}
              className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <FiUpload className="mx-auto mb-2" size={24} />
                  <p className="text-sm">Click to upload image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? <Loading_svg /> : "Add Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
