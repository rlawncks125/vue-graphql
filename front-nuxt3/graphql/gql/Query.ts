import gql from "graphql-tag";

gql`
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
