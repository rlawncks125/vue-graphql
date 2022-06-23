import gql from "graphql-tag";

gql`
  mutation argsType($inputType: GRinputType!, $argsType: String!) {
    getArgsType(name: $argsType) {
      name
      NewField {
        str
      }
    }
    getInputType(argsStr: $inputType) {
      name
      NewField {
        str
      }
    }
  }
`;

gql`
  mutation postSub($str: String!, $postSub: String!) {
    postSub(str: $str, postSub: $postSub)
  }
`;
