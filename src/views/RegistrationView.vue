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
          bottom-slots
          data-cy="user-register-input"
        >
          <template v-slot:hint> Min 6 chars. </template>
        </q-input>
        <q-input
          filled
          label="Email"
          color="amber-10"
          class="q-mb-md"
          v-model="email"
          data-cy="email-register-input"
        />
        <q-input
          v-model="pass"
          filled
          :type="isPwd ? 'password' : 'text'"
          color="amber-10"
          class="q-mb-md"
          label="Password"
          bottom-slots
          data-cy="pass-register-input"
        >
          <template v-slot:hint>
            Min 8 chars. Must include letters an numbers.</template
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
          data-cy="repass-register-input"
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
          data-cy="accept-register-checkbox"
        />
        <div class="row justify-center">
          <q-btn
            label="Register"
            color="secondary"
            push
            :disable="!validateForm || loading"
            :loading="loading"
            @click="registerUser()"
            data-cy="register-btn"
          />
        </div>
      </div>
      <q-space />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import { Notify } from "quasar";
import router from "@/router";

import { useStoreStore } from "@/stores/store";
const store = useStoreStore();

import { storeToRefs } from "pinia";
const { isLoggedIn } = storeToRefs(store);

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
  loading.value = false;
  store.login();
  router.push("/");
  Notify.create({
    type: "positive",
    html: true,
    message: '<div data-cy="registration-toast">Registered successfully</div>',
    timeout: 3000,
  });
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

// LC HOOKS
onBeforeMount(() => {
  if (isLoggedIn.value) router.push("/");
});
</script>
