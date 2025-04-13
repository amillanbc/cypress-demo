import { defineStore } from "pinia";

import Product from "@/types/Product";

import router from "@/router";

export const useStoreStore = defineStore("store", {
  state: () => ({
    isLoggedIn: false,
    cart: <Product[]>[],
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      this.cart = [];
      if (window.location.pathname === "/checkout") router.push("/");
    },
    addToCart(product: Product) {
      this.cart.push(product);
    },
  },
});
