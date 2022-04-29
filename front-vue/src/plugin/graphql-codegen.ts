// graphql-codegen 라이브러리를 활용하기위한 urql 세팅
import {
  createClient,
  provideClient,
  defaultExchanges,
  subscriptionExchange,
} from "@urql/vue";
import { SubscriptionClient } from "subscriptions-transport-ws";

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:3033/graphql",
  {
    reconnect: true,
    connectionParams: {
      acces_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5ODc2MzY1fQ.5onL5nZoPtmnyeH0V1if6Fjldr7r6YgS9vYyUTLLegM",
    },
  }
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

provideClient(urqlClient);
