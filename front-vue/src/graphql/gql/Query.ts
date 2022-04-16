import gql from "graphql-tag";

export const Query_QUERYTEST = gql`
  query queryTest($argsName: String!) {
    getHello {
      name
      NewField {
        str
      }
    }
    getArgsName(name: $argsName) {
      name
      NewField {
        str
      }
    }
  }
`;
