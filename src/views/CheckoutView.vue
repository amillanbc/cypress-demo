<template>
  <q-page>
    <div class="row">
      <q-space />
      <div class="col-7">
        <div class="text-h5 poppins-semibold q-py-lg">Checkout</div>
        <div class="row">
          <div class="col-8 q-pr-md">
            <div
              class="text-h6 text-center q-py-xl text-grey-4"
              data-cy="empty-cart-msg"
              v-if="!cart.length"
            >
              Your cart is empty.
            </div>
            <q-card class="q-mb-md" v-for="(item, index) of cart" :key="index">
              <q-card-section>
                <div class="row items-center">
                  <div class="col-1">
                    <div :style="setProductTileStyle(item.image)" />
                  </div>
                  <div class="col q-pl-xl">
                    <div class="text-h6 product-title">
                      {{ item.title }}
                    </div>
                    <div class="text-h5 q-mb-sm">
                      ${{ item.price.toFixed(2) }}
                    </div>
                    <div
                      class="text-caption text-red cursor-pointer"
                      data-cy="remove-from-cart-btn"
                      @click="store.removeFromCart(index)"
                    >
                      <u>Remove item</u>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-4 q-pa-md bg-grey-2">
            <div class="row justify-between">
              <div class="text-body">Sub-total:</div>
              <div class="text-body poppins-semibold" data-cy="sub-total-amt">
                ${{ calculateSubTotal.toFixed(2) }}
              </div>
            </div>
            <div class="row justify-between">
              <div class="text-body">Taxes:</div>
              <div class="text-body poppins-semibold" data-cy="taxes-amt">
                ${{ calculateTaxes.toFixed(2) }}
              </div>
            </div>
            <q-separator class="q-my-lg" />
            <div class="row justify-between">
              <div class="text-body">Total:</div>
              <div class="text-body poppins-semibold" data-cy="total-amt">
                ${{ calculateTotal.toFixed(2) }}
              </div>
            </div>
            <q-separator class="q-my-lg" />
            <q-btn
              label="Place order"
              class="full-width"
              push
              color="secondary"
              :disable="!cart.length || loading"
              :loading="loading"
              @click="placeOrder()"
              data-cy="place-order-btn"
            />
          </div>
        </div>
      </div>
      <q-space />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import router from "@/router";

import { useStoreStore } from "@/stores/store";
const store = useStoreStore();

import { storeToRefs } from "pinia";
const { isLoggedIn, cart } = storeToRefs(store);

// REFS
const loading = ref(false);

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

const placeOrder = () => {
  loading.value = true;
  loading.value = false;
  store.placeOrder();
};

// COMPUTED
const calculateSubTotal = computed(() => {
  let total = 0;
  for (const item of cart.value) {
    total += item.price;
  }
  return total;
});

const calculateTaxes = computed(() => {
  return calculateSubTotal.value * 0.07;
});

const calculateTotal = computed(() => {
  return calculateSubTotal.value + calculateTaxes.value;
});

// LC HOOKS
onBeforeMount(() => {
  if (!isLoggedIn.value) router.push("/");
});
</script>
