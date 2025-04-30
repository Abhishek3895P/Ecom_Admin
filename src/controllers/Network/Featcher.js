import axios from "axios";
import config from "../../config/config";

const login = async (data) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/auth/login`,
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Post_category = async (data) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/category`,
      method: "POST",
      credentials: "include",
      data,
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Get_category = async () => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/category`,
      method: "GET",
      credentials: "include",
    };

    let response = await axios.request(reqOptions);
    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Put_category = async (id, data) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/category/${id}`,
      method: "PUT",
      credentials: "include",
      data,
    };

    let response = await axios.request(reqOptions);
    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Post_product = async (data) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/products`,
      method: "POST",
      credentials: "include",
      data,
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Get_product = async (data) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/products${data}`,
      method: "GET",
      credentials: "include",
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Get_productById = async (id) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/products/${id}`,
      method: "GET",
      credentials: "include",
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Put_product = async (id, data) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/products/${id}`,
      method: "PUT",
      credentials: "include",
      data,
    };

    let response = await axios.request(reqOptions);
    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const post_recomended = async (data) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/recomended`,
      method: "POST",
      credentials: "include",
      data,
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const get_recomended = async () => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/recomended`,
      method: "GET",
      credentials: "include",
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const delete_recomended_api = async (data) => {
  try {
    const response = await axios.delete(
      `${config.IP_ADDRESS}/api/admin/recomended`,
      {
        headers: { "Content-Type": "application/json" },
        data, // ← your payload goes here
      }
    );
    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Post_banner = async (data) => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/banners`,
      method: "POST",
      credentials: "include",
      data,
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};

const Get_banner = async () => {
  try {
    let reqOptions = {
      url: `${config.IP_ADDRESS}/api/admin/banners`,
      method: "GET",
      credentials: "include",
    };

    let response = await axios.request(reqOptions);

    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};
const delete_banner_api = async (data) => {
  try {
    const response = await axios.delete(
      `${config.IP_ADDRESS}/api/admin/banners`,
      {
        headers: { "Content-Type": "application/json" },
        data, // ← your payload goes here
      }
    );
    return response;
  } catch (error) {
    console.log("ERR ", error);
    throw new Error(error.response.data?.error || "Unexpected Error");
  }
};
export {
  login,
  Post_category,
  Get_category,
  Put_category,
  Post_product,
  Get_product,
  Get_productById,
  Put_product,
  post_recomended,
  get_recomended,
  delete_recomended_api,
  Post_banner,
  Get_banner,delete_banner_api
};
