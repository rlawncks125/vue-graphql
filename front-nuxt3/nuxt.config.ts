import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    // Error: use* functions may only be called during the `setup()` or other lifecycle hooks
    // urql 에러 해결법
    transpile: ["@urql/vue"],
  },
});
