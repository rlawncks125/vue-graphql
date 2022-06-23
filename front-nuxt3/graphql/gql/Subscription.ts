import gql from "graphql-tag";

gql`
  subscription subTest($subID: String!) {
    subTest(subID: $subID)
  }
`;
