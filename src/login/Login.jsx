import React, { useState } from "react";
import { login } from "../controllers/Network/Featcher";
import { useDispatch } from "react-redux";
import { set_User } from "../store/counterSlice";
import { useNavigate } from "react-router-dom";
import { 
  FaEnvelope, 
  FaLock, 
  FaExclamationCircle, 
  FaSignInAlt, 
  FaShieldAlt,
  FaSpinner
} from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    
    try {
      const res = await login(formData);
      if (res.data.role === "user") {
        dispatch(set_User(res.data));
        navigate("/");
      } else {
        setErrorMsg("Unauthorized access. Please use admin credentials.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Card Header with animated gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-8 text-center">
            <div className="flex justify-center mb-4 animate-bounce">
              <FaShieldAlt className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-wide">Admin Portal</h2>
            <p className="mt-2 text-indigo-100 opacity-90">Secure access to your dashboard</p>
          </div>
          
          {/* Card Body */}
          <div className="py-8 px-8">
            {errorMsg && (
              <div className="mb-6 bg-red-50 rounded-lg p-4 flex items-start border-l-4 border-red-500">
                <FaExclamationCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                    <MdOutlinePassword className="mr-1" /> Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? (
                      <FaSpinner className="animate-spin h-5 w-5 text-white" />
                    ) : (
                      <FaSignInAlt className="h-5 w-5 text-indigo-200 group-hover:text-white transition-colors" />
                    )}
                  </span>
                  {loading ? 'Authenticating...' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>

          {/* Card Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Admin Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}