import gql from "graphql-tag";

export const Subscription_SubTest = gql`
  subscription subTest($subID: String!) {
    subTest(subID: $subID)
  }
`;
