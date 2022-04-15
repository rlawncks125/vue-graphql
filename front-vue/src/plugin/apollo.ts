import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP connection to the API
// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri: `http://localhost:3033/graphql`,
// });

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:3033/graphql",
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://localhost:3033/graphql",
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Create the apollo client
// export const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// });

// Cache implementation
const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link,
  cache,
});
