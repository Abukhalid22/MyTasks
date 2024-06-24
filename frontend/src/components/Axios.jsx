import axios from "axios";

// Base URL for the API
const baseUrl = "http://127.0.0.1:8000/";

// Create an Axios instance with default configurations
const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Add a response interceptor for error handling
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call error:", error);
    return Promise.reject(error);
  }
);

export default AxiosInstance;
