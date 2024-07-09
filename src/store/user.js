import { defineStore } from "pinia";
import axios from "../axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    currentUser: null, // Track current logged-in user
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUserProfile(userId) {
      try {
        this.loading = true;
        const response = await axios.get(`/profile/${userId}`);
        const userProfile = response.data.user;
        const existingUserIndex = this.users.findIndex(
          (user) => user.id === userId
        );

        if (existingUserIndex !== -1) {
          this.users[existingUserIndex] = userProfile;
        } else {
          this.users.push(userProfile);
        }

        // Set currentUser to the logged-in user
        this.currentUser = userProfile;
      } catch (error) {
        console.error(
          `Error fetching user profile for userId ${userId}:`,
          error
        );
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async logout(userId) {
      try {
        const response = await axios.post(`/logout/${userId}`);
        if (response.status === 200) {
          // Clear user from store
          const userIndex = this.users.findIndex((user) => user.id === userId);
          if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
          }

          // Reset currentUser
          if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser = null;
          }
        } else {
          console.error(`Failed to logout user ${userId}`);
        }
      } catch (error) {
        console.error(`Error logging out user ${userId}:`, error);
        this.error = error.message;
      }
    },
  },
});
