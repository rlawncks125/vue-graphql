import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    // Error: use* functions may only be called during the `setup()` or other lifecycle hooks
    // urql 에러 해결법
    transpile: [
      "@urql/vue",
      // build Named export 'WebSocket' not found. The requested module 'ws' is a CommonJS module, which may not support all module.exports as named exports. CommonJS modules can always be imported via the default export, for example using
      // 빌드한후 실행시 'webScoket'에러
      // 빌드떄만 node에서 가져올수있게 설정
      process.env.NODE_ENV === "production" ? "ws" : "",
    ],
  },
});
