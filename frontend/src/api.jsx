import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request Interceptor
API.interceptors.request.use((req) => {
  // Don't attach token for auth routes
  if (!req.url.includes("/auth/")) {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    } else {
      // If token is required but not found, throw error
      throw new Error("No authentication token found");
    }
  }
  return req;
}, (error) => {
  console.error("Request Error:", error);
  return Promise.reject(error);
});

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;