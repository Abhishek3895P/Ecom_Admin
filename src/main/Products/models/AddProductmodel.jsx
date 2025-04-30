import { useState, useRef } from "react";
import { FiX, FiUpload, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Post_product } from "../../../controllers/Network/Featcher";

export default function AddProductModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const Categoryredux = useSelector((state) => state.counter.Category);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    category: "",
    images: [],
    stock: "",
    specifications: [{ key: "", value: "" }],
    measurement: "",
    status: "active",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images, ...files];
    setFormData(prev => ({ ...prev, images: newImages }));
    
    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...previewImages];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData(prev => ({ ...prev, images: newImages }));
    setPreviewImages(newPreviews);
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index]);
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const removeSpecification = (index) => {
    const updatedSpecifications = [...formData.specifications];
    updatedSpecifications.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      specifications: updatedSpecifications,
    }));
  };

  const handleSpecificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSpecifications = [...formData.specifications];
    updatedSpecifications[index][name] = value;
    setFormData(prev => ({
      ...prev,
      specifications: updatedSpecifications,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => formDataToSend.append("images", image));
        } else if (key === "specifications") {
          formDataToSend.append("specifications", JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      console.log(formDataToSend)

      // Uncomment when you have your API function ready
      // const response = await Post_product(formDataToSend);
      // dispatch(set_Product(response.data.product));


      Post_product(formDataToSend).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

      
    //   resetForm();
    //   onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      // Add error handling (e.g., show toast notification)
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      discountedPrice: "",
      images: [],
      stock: "",
      specifications: [{ key: "", value: "" }],
      measurement: "",
      status: "active",
    });
    setPreviewImages([]);
    
    // Revoke all object URLs
    previewImages.forEach(url => URL.revokeObjectURL(url));
  };

  const isFormValid = formData.title && formData.category && formData.price ;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Price and Discounted Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Category */}
         
 {/* Category */}
 <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Category</option>
              {Categoryredux?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter available quantity"
              min="0"
              required
            />
          </div>

          {/* Measurement - Fixed typo from measurment to measurement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Measurement</label>
            <input
              type="text"
              name="measurement"
              value={formData.measurement}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 200g, 500ml"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Specifications */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Specifications</label>
              <button
                type="button"
                onClick={addSpecification}
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                + Add Specification
              </button>
            </div>
            
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  name="key"
                  value={spec.key}
                  onChange={(e) => handleSpecificationChange(index, e)}
                  placeholder="Key (e.g., Color)"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="value"
                  value={spec.value}
                  onChange={(e) => handleSpecificationChange(index, e)}
                  placeholder="Value (e.g., Red)"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            
            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ₹{index + 1}`}
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
            
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <FiUpload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 text-center">
                Click to upload or drag and drop<br />
                <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
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
        </form>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
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
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`px-4 py-2.5 rounded-lg text-white transition-colors ${
              isFormValid 
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-400 cursor-not-allowed"
            }`}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}