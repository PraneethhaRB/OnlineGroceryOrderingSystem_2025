
// import axios from "axios";
// import { API_BASE } from "./constants";

// // ------------------ Product APIs ------------------
// export const getProducts = async () => {
//  const res = await axios.get(`${API_BASE}/products`);
//  return res.data;
// };

// export const getProductById = async (id) => {
//  const res = await axios.get(`${API_BASE}/products/${id}`);
//  return res.data;
// };

// export const getAllProducts = async () => {
//  return getProducts();
// };

// export const getProductsByCategory = async (category) => {
//  const res = await axios.get(`${API_BASE}/products`, {
//   params: { category },
//  });
//  return res.data;
// };

// export const addProduct = async (product) => {
//  const res = await axios.post(`${API_BASE}/products`, product);
//  return res.data;
// };

// export const updateProduct = async (id, product) => {
//  const res = await axios.put(`${API_BASE}/products/${id}`, product);
//  return res.data;
// };

// export const deleteProduct = async (id) => {
//  await axios.delete(`${API_BASE}/products/${id}`);
// };

// // ------------------ Order APIs ------------------
// export const getOrders = async () => {
//  const res = await axios.get(`${API_BASE}/orders`);
//  return res.data;
// };

// // export const createOrder = async (orderData) => {
// //  const res = await axios.post(`${API_BASE}/orders`, orderData);
// //  return res.data;
// // };

// export const placeOrder = createOrder;
// // ------------------ Auth APIs ------------------
// export const signup = async (userData) => {
//   const res = await axios.post(`${API_BASE}/users`, userData, { withCredentials: true });
//   return res.data;
// };

// export const login = async (credentials) => {
//   const res = await axios.post(`${API_BASE}/users/login`, credentials, { withCredentials: true });
//   return res.data;
// };



// export const signupVendor = async (vendorData) => {
//   const res = await axios.post(`http://localhost:8080/vendors`, vendorData, {
//     withCredentials: true
//   });
//   return res.data;
// };

// //correctoneivechangedforjwt
// // export const vendorLogin = async (credentials) => {
// //   const res = await axios.post(`http://localhost:8080/vendors/login`, credentials, { withCredentials: true });
// //   return res.data;
// // };
// //correctoneivechangedforjwt
// export const vendorLogin = async ({ email, password }) => {
//   const res = await axios.post(`http://localhost:8080/vendors/login`, { email, password });

//   const { vendor, token } = res.data;

//   // Save JWT for later authenticated requests
//   localStorage.setItem("jwtToken", token);
//   localStorage.setItem("vendorInfo", JSON.stringify(vendor));

//   return { vendor, token };
// };

// // Vendor Products
// // export const getProductsByVendor = async (vendorId) => {
// //   const res = await axios.get(`${API_BASE}/products?vendorId=${vendorId}`);
// //   return res.data;
// // };

// export const createProduct = async (product) => {
//   const res = await axios.post(`${API_BASE}/products`, product);
//   return res.data;
// };

// // export const updateProduct = async (id, product) => {
// //   const res = await axios.put(`${API_BASE}/products/${id}`, product);
// //   return res.data;
// // };

// export const deleteProductById = async (id) => {
//   await axios.delete(`${API_BASE}/products/${id}`);
// };
// //products
// // Fetch products only for a specific vendor
// export const getProductsByVendor = async (vendorId) => {
//   const res = await axios.get(`${API_BASE}/products/vendor/${vendorId}`);
//   return res.data;
// };

// //verynewchangeifnotworkdelete
// // utils/api.js
// // utils/api.js

// // Create Order

// // utils/api.js

// // ✅ Create a new user
// // utils/api.js


// // function declaration (hoisted)
// export async function createOrder(orderData) {
//   const res = await axios.post(`${API_BASE}/orders`, orderData);
//   return res.data;
// }

// // function declaration (hoisted)
// export async function createUser(userData) {
//   const res = await axios.post(`${API_BASE}/users`, userData);
//   return res.data;
// }
// export const getUserById = async (id) => {
//   const res = await fetch(`http://localhost:8080/api/users/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch user");
//   return res.json();
// };
// //newnew
// // ------------------ Vendor Orders ------------------

// // Get all orders for a specific vendor
// export const getOrdersByVendor = async (vendorId) => {
//   const res = await axios.get(`${API_BASE}/orders/vendor/${vendorId}`);
//   return res.data;
// };

// // Update status of an order (vendor)
// export const updateOrderStatus = async (orderId, status) => {
//   const res = await axios.put(`${API_BASE}/orders/${orderId}/status`, { status });
//   return res.data;
// };
import axios from "axios";
import { API_BASE } from "./constants";

// ------------------ Axios instance with JWT ------------------
const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT token to every request if it exists
api.interceptors.request.use((config) => {
  // Vercel may render parts of the app on the server during build/SSR.
  // Guard browser-only APIs.
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ------------------ Product APIs ------------------
export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const getAllProducts = () => getProducts();

export const getProductsByCategory = async (category) => {
  const res = await api.get("/products", { params: { category } });
  return res.data;
};

export const addProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await api.put(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

// ------------------ Product aliases (for backward compatibility) ------------------
export const createProduct = addProduct;
export const deleteProductById = deleteProduct;

export const getProductsByVendor = async (vendorId) => {
  const res = await api.get(`/products/vendor/${vendorId}`);
  return res.data;
};

// ------------------ Order APIs ------------------
export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const getOrdersByVendor = async (vendorId) => {
  const res = await api.get(`/orders/vendor/${vendorId}`);
  return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await api.put(`/orders/${orderId}/status`, { status });
  return res.data;
};

// ------------------ Auth APIs ------------------
export const signup = async (userData) => {
  const res = await api.post("/users", userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post("/users/login", credentials);
  return res.data;
};

// ------------------ Vendor APIs ------------------
export const signupVendor = async (vendorData) => {
  const res = await axios.post("http://localhost:8080/vendors", vendorData);
  return res.data;
};

export const vendorLogin = async ({ email, password }) => {
  const res = await axios.post("http://localhost:8080/vendors/login", { email, password });
  const { vendor, token } = res.data;

  // Store JWT for authenticated requests (browser only)
  if (typeof window !== "undefined") {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("vendorInfo", JSON.stringify(vendor));
  }

  return { vendor, token };
};

// ------------------ User APIs ------------------
export const createUser = async (userData) => {
  const res = await api.post("/users", userData);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};