import React, { useEffect, useState } from "react";
import {
  FiShoppingCart,
  FiTag,
  FiDollarSign,
  FiLayers,
  FiInfo,
  FiBox,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiChevronLeft,
} from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import { Get_productById } from "../../../controllers/Network/Featcher";
import EditProductModel from "./models/EditProductModel";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const Categoryredux = useSelector((state) => state.counter.Category);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product.images) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const getdata = () => {
    setLoading(true);
    Get_productById(id)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getdata();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <EditProductModel
        isOpen={isEditModalOpen}
        onClose={() => {
          getdata();
          setIsEditModalOpen(false);
        }}
        product={product}
        categories={Categoryredux}
        onSave={() => console.log("Product saved")}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-6">
          <div className="flex justify-between">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors p-3 bg-white rounded-full cursor-pointer"
              >
                <FiChevronLeft className="mr-1" />
              </button>
              <Breadcrumb
                items={[
                  { label: "All Products", href: "/products" },
                  { label: "Product Detail", href: null },
                ]}
              />
            </div>{" "}
            {!loading && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
              >
                <FiEdit2 className="mr-2" /> Edit Product
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {loading ? <Skeleton width={200} /> : product.title}
          </h1>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery Skeleton */}
                <div>
                  <Skeleton height={384} className="mb-4" />
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} height={80} />
                    ))}
                  </div>
                </div>

                {/* Product Info Skeleton */}
                <div>
                  <div className="flex justify-between mb-6">
                    <Skeleton width={200} height={30} />
                    <Skeleton width={100} height={24} />
                  </div>
                  <Skeleton height={24} width={150} className="mb-6" />
                  <Skeleton count={4} className="mb-4" />
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} height={60} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <div>
                <div className="h-96 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`h-20 cursor-pointer rounded-md overflow-hidden border-2 ${
                        mainImage === img
                          ? "border-indigo-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                {/* Title and Status */}
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {product.title}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.status === "active" ? (
                      <FiCheckCircle className="inline mr-1" />
                    ) : (
                      <FiXCircle className="inline mr-1" />
                    )}
                    {product.status.charAt(0).toUpperCase() +
                      product.status.slice(1)}
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-center text-gray-600 mb-6">
                  <FiTag className="mr-2 text-gray-400" />
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-sm">
                    {product.category?.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline">
                    <p className="text-gray-500 mr-2">Price:</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-800">
                        ₹
                        {product.discountedPrice?.toFixed(2) ||
                          product.price.toFixed(2)}
                      </span>
                      {product.discountedPrice && (
                        <span className="ml-2 text-lg text-gray-500 line-through">
                          ₹{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  {product.discountedPrice && (
                    <span className="text-sm text-green-600 mt-1 block">
                      {Math.round(
                        (1 - product.discountedPrice / product.price) * 100
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="flex items-center text-lg font-medium text-gray-800 mb-2">
                    <FiInfo className="mr-2 text-indigo-500" />
                    Description
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                {/* Specifications */}
                {product.specifications?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="flex items-center text-lg font-medium text-gray-800 mb-2">
                      <FiLayers className="mr-2 text-indigo-500" />
                      Specifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="text-sm text-gray-500">
                            {spec.key}
                          </div>
                          <div className="font-medium">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <FiBox className="mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Stock</div>
                        <div className="font-medium">
                          {product.stock > 0 ? (
                            <span className="text-green-600">
                              {product.stock} available
                            </span>
                          ) : (
                            <span className="text-red-600">Out of stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">
                          Last Updated
                        </div>
                        <div className="font-medium">
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {product.measurement && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <FiLayers className="mr-2 text-gray-400" />
                        <div>
                          <div className="text-xs text-gray-500">
                            Measurement
                          </div>
                          <div className="font-medium">
                            {product.measurement}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
