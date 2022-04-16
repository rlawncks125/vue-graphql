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
  { reconnect: true }
);

export const urqlClient = createClient({
  url: "http://localhost:3033/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});

provideClient(urqlClient);
