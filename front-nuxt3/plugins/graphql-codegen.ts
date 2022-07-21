// graphql-codegen 라이브러리를 활용하기위한 urql 세팅
import urql, {
  createClient,
  defaultExchanges,
  Exchange,
  provideClient,
  subscriptionExchange,
} from "@urql/vue";
import { SubscriptionClient } from "subscriptions-transport-ws";
// import * as ws from "ws";
import { WebSocket } from "ws";

import pkg from "ws";
const { WebSocket: WebSocketNode } = pkg;

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:3033/graphql",
  {
    reconnect: true,
    connectionParams: {
      acces_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5ODc2MzY1fQ.5onL5nZoPtmnyeH0V1if6Fjldr7r6YgS9vYyUTLLegM",
    },
  },
  WebSocket || WebSocketNode
);

export const urqlClient = createClient({
  url: "http://localhost:3033/graphql",
  fetchOptions: {
    headers: {
      acces_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5ODc2MzY1fQ.5onL5nZoPtmnyeH0V1if6Fjldr7r6YgS9vYyUTLLegM",
    },
  },
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(urql, urqlClient);
});
