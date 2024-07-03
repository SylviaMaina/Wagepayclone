import axios from "axios";
import router from "./router/index";
import { useUserStore } from "./store/user"; // Ensure correct import path

const api = axios.create({
  baseURL: "http://localhost:3000/auth", // Adjust baseURL according to your API endpoint
});

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
