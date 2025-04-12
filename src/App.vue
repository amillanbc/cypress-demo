<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-amber-10">
      <q-toolbar class="justify-center">
        <div class="col-7">
          <div class="row items-center justify-between">
            <div
              class="text-subtitle2 poppins-semibold cursor-pointer"
              @click="$router.push('/')"
            >
              Cypress Demo Shop
            </div>
            <div>
              <q-btn-dropdown stretch flat label="Login">
                <div class="q-pa-md">
                  <q-input
                    filled
                    v-model="user"
                    label="User"
                    class="q-mb-sm"
                    color="amber-10"
                  />
                  <q-input
                    filled
                    v-model="pass"
                    label="Password"
                    color="amber-10"
                  />
                </div>
                <q-separator />
                <div class="q-pa-md">
                  <q-btn
                    label="Login"
                    push
                    color="secondary"
                    class="full-width"
                    @click="login()"
                    :disabled="!user || !pass"
                  />
                  <div
                    class="text-caption text-red q-mt-sm text-center"
                    v-if="errAtLogin"
                  >
                    Login error.
                  </div>
                </div>
              </q-btn-dropdown>
              <q-btn
                size="sm"
                flat
                round
                color="white"
                icon="shopping_cart"
                class="q-ml-md"
              />
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// REFS
const user = ref("");
const pass = ref("");
const errAtLogin = ref(false);

// METHODS
const login = () => {
  if (user.value === "admin" && pass.value === "admin") {
    console.log("user logged in");
    errAtLogin.value = false;
  } else {
    errAtLogin.value = true;
  }
};
</script>
