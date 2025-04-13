<template>
  <q-page>
    <div class="row">
      <q-space />
      <div class="col-4">
        <div class="text-h4 poppins-semibold text-center q-my-lg">
          Registration
        </div>
        <q-input
          filled
          label="User"
          color="amber-10"
          class="q-mb-md"
          v-model="user"
        />
        <q-input
          filled
          label="Email"
          color="amber-10"
          class="q-mb-md"
          v-model="email"
        />
        <q-input
          v-model="pass"
          filled
          :type="isPwd ? 'password' : 'text'"
          color="amber-10"
          class="q-mb-md"
          label="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
          filled
          label="Confirm password"
          color="amber-10"
          class="q-mb-md"
          v-model="repass"
          :type="isRePwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isRePwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isRePwd = !isRePwd"
            />
          </template>
        </q-input>
        <q-checkbox
          v-model="accept"
          color="amber-10"
          class="q-mb-md"
          label="Accept terms & conditions"
        />
        <div class="row justify-center">
          <q-btn
            label="Register"
            color="secondary"
            push
            :disable="!validateForm || loading"
            :loading="loading"
            @click="registerUser()"
          />
        </div>
      </div>
      <q-space />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import router from "@/router";

import { useStoreStore } from "@/stores/store";
const store = useStoreStore();

// REFS
const user = ref("");
const email = ref("");
const pass = ref("");
const repass = ref("");
const accept = ref(false);

const isPwd = ref(true);
const isRePwd = ref(true);

const loading = ref(false);

const validUser = /^.{6,}$/;
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validPass = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// METHODS
const registerUser = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    store.login();
    router.push("/");
  }, 2000);
};

// COMPUTED
const validateForm = computed(() => {
  return (
    validUser.test(user.value) &&
    validEmail.test(email.value) &&
    validPass.test(pass.value) &&
    pass.value === repass.value &&
    accept.value
  );
});
</script>
