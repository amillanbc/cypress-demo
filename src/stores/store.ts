import { defineStore } from "pinia";

import Product from "@/types/Product";

import router from "@/router";

import { Notify } from "quasar";

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
    removeFromCart(index: number) {
      this.cart.splice(index, 1);
    },
    placeOrder() {
      this.cart = [];
      router.push("/");
      Notify.create({
        type: "positive",
        html: true,
        message:
          '<div data-cy="order-placed-toast">Order placed successfully</div>',
        timeout: 3000,
      });
    },
  },
});
