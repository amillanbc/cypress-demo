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
                data-cy="auth-btn"
              >
                <template v-if="!isLoggedIn">
                  <div class="q-pa-md" data-cy="login-form">
                    <q-input
                      filled
                      v-model="user"
                      label="User"
                      class="q-mb-sm"
                      color="amber-10"
                      @click="errAtLogin = false"
                      data-cy="user-input"
                    />
                    <q-input
                      filled
                      v-model="pass"
                      label="Password"
                      color="amber-10"
                      @click="errAtLogin = false"
                      data-cy="pass-input"
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
                      :loading="loading"
                      :disabled="!user || !pass || loading"
                      data-cy="login-btn"
                    />
                    <div
                      class="text-caption text-red q-mt-sm text-center"
                      data-cy="login-err-msg"
                      v-if="errAtLogin"
                    >
                      Login error.
                    </div>
                    <div
                      class="text-caption q-mt-sm text-center cursor-pointer"
                      data-cy="register-btn"
                      v-close-popup
                    >
                      <u @click="$router.push('/register')">Register</u>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="q-pa-md" data-cy="auth-welcome">
                    <div class="text-caption">Welcome,</div>
                    <div class="text-subtitle poppins-semibold">
                      Admin Admin
                    </div>
                  </div>
                  <q-separator />
                  <div class="q-pa-md">
                    <div
                      class="text-center text-caption cursor-pointer"
                      data-cy="logout-btn"
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
                v-show="isLoggedIn"
                @click="$router.push('/checkout')"
                data-cy="checkout-btn"
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
const loading = ref(false);

// METHODS
const login = () => {
  loading.value = true;
  if (user.value === "admin" && pass.value === "admin") {
    loading.value = false;
    store.login();
    user.value = "";
    pass.value = "";
    errAtLogin.value = false;
  } else {
    errAtLogin.value = true;
    loading.value = false;
  }
};

const logout = () => store.logout();
</script>
