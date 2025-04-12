import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

import "./styles/cypress-demo-styles.css";

createApp(App).use(Quasar, quasarUserOptions).use(router).mount("#app");
