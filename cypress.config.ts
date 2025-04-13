import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    URL: "http://localhost:8080/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
