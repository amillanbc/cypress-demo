<template>
  <q-page>
    <!-- HERO -->
    <q-img src="https://placehold.co/1920x600" class="q-mb-xl" />
    <!-- /HERO -->
    <div class="row justify-center">
      <div class="col-7">
        <div class="row">
          <div
            class="col-3 q-pa-md"
            v-for="product in allProducts"
            :key="product.id"
          >
            <q-card class="my-card">
              <q-card-section @click="$router.push(`/product/${product.id}`)">
                <div :style="setProductTileStyle(product.image)" />
              </q-card-section>
              <q-card-section>
                <div class="text-subtitle2 product-title">
                  {{ product.title }}
                </div>
                <div class="text-caption">${{ product.price.toFixed(2) }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import Product from "@/types/Product";

// REFS
const allProducts = ref<Product[]>([]);

// METHODS
const setProductTileStyle = (url: string) => {
  return {
    width: "100%",
    height: "200px",
    backgroundImage: `url(${url})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    cursor: "pointer",
  };
};

// LC HOOKS
onMounted(() => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data: Product[]) => (allProducts.value = data));
});
</script>

<style scoped>
.product-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
