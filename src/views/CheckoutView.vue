<template>
  <q-page>
    <div class="row">
      <q-space />
      <div class="col-7">
        <div class="text-h5 poppins-semibold q-py-lg">Checkout</div>
      </div>
      <q-space />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import router from "@/router";

import { useStoreStore } from "@/stores/store";
const store = useStoreStore();

import { storeToRefs } from "pinia";
const { isLoggedIn } = storeToRefs(store);

// LC HOOKS
onBeforeMount(() => {
  if (!isLoggedIn.value) router.push("/");
});
</script>
