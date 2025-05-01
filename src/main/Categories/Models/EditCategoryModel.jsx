import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { FiX, FiUpload, FiImage } from "react-icons/fi";
import {
  Post_category,
  Put_category,
} from "../../../controllers/Network/Featcher";
import { useDispatch, useSelector } from "react-redux";
import { set_Category } from "../../../store/counterSlice";
import Loading_svg from "../../../components/Loading_svg";

export default function AddCategoryModal({ CategryToedit, isOpen, onClose }) {
  const dispacher = useDispatch();
  const Categoryredux = useSelector((state) => state.counter.Category);

  const [loading, setloading] = useState(false);
  const [errormsh, seterrormsh] = useState(null);

  console.log("fp  orm", CategryToedit);
  const [formData, setFormData] = useState({
    name: CategryToedit.name,
    slug: CategryToedit.slug,
    image: CategryToedit.image,
    previewImage: null,
  });
  const fileInputRef = useRef();
  console.log("fporm", formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    seterrormsh(null);
    const { previewImage, ...submitData } = formData;
    // onSubmit(submitData);

    console.log(submitData);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("slug", formData.slug);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    Put_category(CategryToedit._id, formDataToSend)
      .then((res) => {
        console.log(res.data);
        let modified = [];
        for (let item of Categoryredux) {
          if (item._id == res.data.category._id) {
            modified.push(res.data.category);
          } else {
            modified.push(item);
          }
        }
        dispacher(set_Category(modified));
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

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      image: null,
      previewImage: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Category{errormsh&&<p className="text-sm">{errormsh}</p>}</h2>
          <button
            onClick={() => {
              //   resetForm();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Electronics"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Describe this category..."
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Image
            </label>
            <div
              onClick={triggerFileInput}
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden"
            >
              {formData.previewImage ? (
                <>
                  <img
                    src={formData.previewImage}
                    alt="Preview"
                    className="h-full w-full object-cover absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-full w-full object-cover absolute inset-0"
                  />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              disabled={!formData.name || loading}
            >
               {loading ? <Loading_svg /> : "Edit Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
