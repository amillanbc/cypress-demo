import { defineStore } from "pinia";

import Product from "@/types/Product";

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
    },
    addToCart(product: Product) {
      this.cart.push(product);
    },
  },
});
