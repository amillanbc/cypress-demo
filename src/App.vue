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
              <q-btn-dropdown
                stretch
                flat
                :label="isLoggedIn ? 'My account' : 'Login'"
              >
                <template v-if="!isLoggedIn">
                  <div class="q-pa-md">
                    <q-input
                      filled
                      v-model="user"
                      label="User"
                      class="q-mb-sm"
                      color="amber-10"
                      @click="errAtLogin = false"
                    />
                    <q-input
                      filled
                      v-model="pass"
                      label="Password"
                      color="amber-10"
                      @click="errAtLogin = false"
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
                    <div
                      class="text-caption q-mt-sm text-center cursor-pointer"
                      v-close-popup
                    >
                      <u>Register</u>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="q-pa-md">
                    <div class="text-caption">Welcome,</div>
                    <div class="text-subtitle poppins-semibold">
                      Admin Admin
                    </div>
                  </div>
                  <q-separator />
                  <div class="q-pa-md">
                    <div
                      class="text-center text-caption cursor-pointer"
                      @click="logout()"
                    >
                      <u>Logout</u>
                    </div>
                  </div>
                </template>
              </q-btn-dropdown>
              <q-btn
                size="sm"
                flat
                round
                color="white"
                icon="shopping_cart"
                class="q-ml-md"
                v-if="isLoggedIn"
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
import { useStoreStore } from "@/stores/store";
const store = useStoreStore();

import { storeToRefs } from "pinia";
const { isLoggedIn } = storeToRefs(store);

import { ref } from "vue";

// REFS
const user = ref("");
const pass = ref("");
const errAtLogin = ref(false);

// METHODS
const login = () => {
  if (user.value === "admin" && pass.value === "admin") {
    store.login();
    user.value = "";
    pass.value = "";
    errAtLogin.value = false;
  } else {
    errAtLogin.value = true;
  }
};

const logout = () => store.logout();
</script>
