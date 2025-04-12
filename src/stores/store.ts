import { defineStore } from "pinia";

export const useStoreStore = defineStore("store", {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
});
