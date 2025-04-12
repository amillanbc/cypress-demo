import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import quasarUserOptions from "./quasar-user-options";

import "./styles/cypress-demo-styles.css";

createApp(App)
  .use(createPinia())
  .use(Quasar, quasarUserOptions)
  .use(router)
  .mount("#app");
