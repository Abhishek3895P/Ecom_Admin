import React, { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiImage,
  FiDollarSign,
  FiTag,
  FiLayers,
  FiBox,
  FiCheckCircle,
  FiMinusCircle,
} from "react-icons/fi";
import { Put_product } from "../../../../controllers/Network/Featcher";
import Loading_svg from "../../../../components/Loading_svg";

const EditProductModal = ({ isOpen, onClose, product, categories, onSave }) => {
  if (!isOpen) return null;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    category: "",
    images: [],
    stock: 0,
    specifications: [{ key: "", value: "" }],
    measurment: "",
    status: "active",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const fileInputRef = useRef(null);

  const [loading, setloading] = useState(false);
  const [errormsh, seterrormsh] = useState(null);
  // Initialize form with product data
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || 0,
        discountedPrice: product.discountedPrice || 0,
        category: product.category?._id || "",
        images: product.images || [],
        stock: product.stock || 0,
        specifications: product.specifications?.length
          ? [...product.specifications]
          : [{ key: "", value: "" }],
        measurment: product.measurment || "",
        status: product.status || "active",
      });
      setImagePreviews(product.images || []);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setNewImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    const updatedNewImages = [...newImages];

    // If it's a new image (not yet uploaded)
    if (index >= formData.images.length) {
      updatedNewImages.splice(index - formData.images.length, 1);
      setNewImages(updatedNewImages);
    }
    if (index < formData.images.length) {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((item, i) => i !== index),
      }));
    }

    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
    console.log(updatedPreviews);
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const removeSpecification = (index) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      specifications: updatedSpecs,
    }));
  };

  const handleSpecChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      specifications: updatedSpecs,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterrormsh(null);
    // Prepare the data to save
    const updatedProduct = {
      ...formData,
      images: imagePreviews.filter((_, i) => i < formData.images.length), // Keep original images
      newImages, // Add new images to be uploaded
    };

    // Create FormData object to handle file uploads
    const formDataToSend = new FormData();

    // Append basic fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("discountedPrice", formData.discountedPrice);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("measurement", formData.measurment); // Note: Fix the typo to 'measurement' if needed
    formDataToSend.append("status", formData.status);

    // Append existing images (URLs)
    formData.images.forEach((image, index) => {
      formDataToSend.append(`images`, image);
    });

    // Append new image files
    newImages.forEach((file, index) => {
      formDataToSend.append("newImages", file);
    });

    // Append specifications
    const specificationsJSON = JSON.stringify(formData.specifications);
    formDataToSend.append("specifications", specificationsJSON);

    console.log(formDataToSend);

    Put_product(product._id, formDataToSend)
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

    // onSave(updatedProduct);
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            <FiEdit2 className="inline mr-2" />
            Edit Product
            {errormsh&&<p className="text-sm">{errormsh}</p>}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discounted Price
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Stock & Measurement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Measurement
              </label>
              <input
                type="text"
                name="measurment"
                value={formData.measurment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 200g, 500ml"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleInputChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 flex items-center">
                  <FiCheckCircle className="text-green-500 mr-1" />
                  Active
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleInputChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 flex items-center">
                  <FiMinusCircle className="text-red-500 mr-1" />
                  Inactive
                </span>
              </label>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Specifications
              </label>
              <button
                type="button"
                onClick={addSpecification}
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline flex items-center"
              >
                <FiPlus className="mr-1" />
                Add Specification
              </button>
            </div>

            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  name="key"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(index, e)}
                  placeholder="Key (e.g., Color)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="value"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, e)}
                  placeholder="Value (e.g., Black)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                {formData.specifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {imagePreviews.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-white/80 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload New Images */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <FiImage className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 text-center">
                Click to upload or drag and drop
                <br />
                <span className="text-xs text-gray-400">
                  PNG, JPG up to 5MB
                </span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
            disabled={loading}
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
                {loading ? <Loading_svg /> : "Save Changes"}
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
