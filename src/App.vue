<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-amber-10">
      <q-toolbar class="justify-center">
        <div class="col-7">
          <div class="row items-center justify-between">
            <div class="text-subtitle2 poppins-semibold">Cypress Demo Shop</div>
            <div>
              <q-btn size="sm" flat color="white" class="q-mr-md">
                Iniciar sesión
              </q-btn>
              <q-btn size="sm" flat round color="white" icon="shopping_cart" />
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

<script lang="ts" setup></script>
