import axios from "axios";
import router from "./router/index";
import { useUserStore } from "./store/user";

const api = axios.create({
  baseURL: "http://localhost:3000/auth", // Adjust baseURL according to your API endpoint
});

// Add a request interceptor to include Bearer token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const userStore = useUserStore();

    if (error.response && error.response.status === 401) {
      userStore.logout();
      router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default api;
