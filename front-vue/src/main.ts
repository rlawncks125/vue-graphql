import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugin/apollo";

createApp(App)
  .use(store)
  .use(router)
  .provide(DefaultApolloClient, apolloClient)
  .mount("#app");
