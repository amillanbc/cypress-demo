<template>
  <q-page class="q-pa-xl" v-if="product">
    <div class="row">
      <q-space />
      <div class="col-7">
        <div class="row">
          <div class="col-4 q-pa-md">
            <q-img :src="product.image" />
          </div>
          <div class="col q-pa-md">
            <div class="text-h4">{{ product.title }}</div>
            <div class="text-caption q-mb-sm">{{ product.category }}</div>
            <div class="q-mb-lg">
              <q-rating v-model="product.rating.rate" readonly />
              ({{ product.rating.count }})
            </div>
            <div class="text-body q-mb-lg">{{ product.description }}</div>
            <div class="text-h2 poppins-semibold q-mb-lg">
              ${{ product.price.toFixed(2) }}
            </div>
            <q-btn
              color="secondary"
              push
              icon-right="shopping_cart"
              label="Add to cart"
              @click="addToCart()"
            />
          </div>
        </div>
      </div>
      <q-space />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Notify } from "quasar";
import router from "@/router";

import Product from "@/types/Product";

import { useStoreStore } from "@/stores/store";
const store = useStoreStore();

import { storeToRefs } from "pinia";
const { isLoggedIn } = storeToRefs(store);

const route = useRoute();

// REFS
const product = ref<Product>();

// METHODS
const addToCart = () => {
  if (!isLoggedIn.value) {
    Notify.create({
      type: "negative",
      html: true,
      message: '<div data-cy="login-required-toast">Login is required</div>',
      timeout: 3000,
    });
    return;
  }
  if (product.value) {
    store.addToCart(product.value);
    router.push("/");
  }
};

// LC HOOKS
onMounted(() => {
  fetch(`https://fakestoreapi.com/products/${route.params.id}`)
    .then((response) => response.json())
    .then((data: Product) => (product.value = data));
});
</script>
