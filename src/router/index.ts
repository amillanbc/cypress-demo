import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import CheckoutView from "@/views/CheckoutView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegistrationView,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductView,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
