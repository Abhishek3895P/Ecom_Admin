import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Post_product } from "../../../controllers/Network/Featcher";
import Loading_svg from "../../../components/Loading_svg";
import config from "../../../config/config";

const AmazonScraperModal = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState("");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Category_filter, setCategory_filter] = useState(null);
  const [errormsh, seterrormsh] = useState(null);
  const dispatch = useDispatch();
  const Categoryredux = useSelector((state) => state.counter.Category);

  const Category_sdelect_handler = (event) => {
    setCategory_filter(event.target.value === "999999999" ? null : event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!url.includes("amazon.")) {
        throw new Error("Please enter a valid Amazon URL");
      }

      const response = await axios.post(config.PYTHON_API+"/api/scrape", {
        url: url,
      });

      if (response.data.status === "success") {
        setProductData(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch product data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUrl("");
    setProductData(null);
    setError(null);
    seterrormsh(null);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
   
    if (Category_filter == null) {
      seterrormsh("Please select a category");
      return;
    }

    setLoading(true);
    seterrormsh(null);
    const formDataToSend = new FormData();

    // Append basic fields
    formDataToSend.append("title", productData.title);
    formDataToSend.append("description", productData.description);
    formDataToSend.append("price", productData.price);
    formDataToSend.append("discountedPrice", productData.discountedPrice);
    formDataToSend.append("category", Category_filter);
    formDataToSend.append("stock", productData.stock);
    formDataToSend.append("measurement", productData.measurment);
    formDataToSend.append("status", productData.status);

    // Append existing images (URLs)
    productData.images.forEach((image) => {
      formDataToSend.append(`imageurls`, image);
    });

    // Append specifications
    formDataToSend.append("specifications", JSON.stringify([]));

    Post_product(formDataToSend)
      .then((res) => {
        if (res.data.success) {
          resetForm();
          onClose();
        }
      })
      .catch((err) => {
        console.error(err);
        seterrormsh("Oops, something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Amazon Product Importer</h2>
            {errormsh && <p className="text-sm text-red-600 mt-1">{errormsh}</p>}
          </div>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!productData ? (
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="amazonUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Amazon Product URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="amazonUrl"
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://www.amazon.com/dp/B08N5KWB9H"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <Loading_svg className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        "Fetch Product"
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmitProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={productData.title || ""}
                    onChange={(e) => setProductData({...productData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    onChange={Category_sdelect_handler}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="999999999">Select a category</option>
                    {Categoryredux.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={productData.price || ""}
                    onChange={(e) => setProductData({...productData, price: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discounted Price (₹)
                  </label>
                  <input
                    type="number"
                    value={productData.discountedPrice || ""}
                    onChange={(e) => setProductData({...productData, discountedPrice: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={productData.stock || ""}
                    onChange={(e) => setProductData({...productData, stock: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={productData.description || ""}
                  onChange={(e) => setProductData({...productData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Measurement
                  </label>
                  <input
                    type="text"
                    value={productData.measurment || ""}
                    onChange={(e) => setProductData({...productData, measurment: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={productData.status || "active"}
                    onChange={(e) => setProductData({...productData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loading_svg className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmazonScraperModal;