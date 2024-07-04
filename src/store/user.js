import { defineStore } from "pinia";
import axios from "../axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUserProfile() {
      try {
        this.loading = true;
        const response = await axios.get("/profile");
        this.user = response.data.user;
      } catch (error) {
        console.error("Error fetching user profile:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
