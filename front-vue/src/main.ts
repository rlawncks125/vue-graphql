import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugin/apollo";
import urql from "@urql/vue";
import { urqlClient } from "@/plugin/graphql-codegen";

createApp(App)
  .use(store)
  .use(router)
  .use(urql, urqlClient) // graphql-codegen 라이브러리 urql 통신 사용
  .provide(DefaultApolloClient, apolloClient)
  .mount("#app");
