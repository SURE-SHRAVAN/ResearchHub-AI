import axios from "axios";

/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
| Centralized API configuration for the entire app
| Handles:
| - Base URL
| - Auth token injection
| - Global error handling
| - Auto logout on 401
|--------------------------------------------------------------------------
*/

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
| Automatically attach JWT token to every request
|--------------------------------------------------------------------------
*/
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
| Handles:
| - 401 → Auto logout
| - 403 → Permission error
| - Network failures
|--------------------------------------------------------------------------
*/
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 🔐 Unauthorized → Token invalid or expired
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_type");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // 🚫 Forbidden
    if (status === 403) {
      console.error("Access forbidden:", error.response?.data);
    }

    // 🌐 Network error
    if (!error.response) {
      console.error("Network error. Check backend server.");
    }

    return Promise.reject(error);
  }
);

export default API;
