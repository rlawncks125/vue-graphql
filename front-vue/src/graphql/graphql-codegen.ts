import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GRinputType = {
  name: Scalars['String'];
};

export type GraphQlTest = {
  __typename?: 'GraphQLTest';
  NewField: NewFiled;
  array?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getArgsType: GraphQlTest;
  getInputType: GraphQlTest;
  postSub: Scalars['String'];
  updateUser: User;
  updateUserResturnString: Scalars['String'];
};


export type MutationGetArgsTypeArgs = {
  name: Scalars['String'];
};


export type MutationGetInputTypeArgs = {
  argsStr: GRinputType;
};


export type MutationPostSubArgs = {
  postSub: Scalars['String'];
  str: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  dsc: Scalars['String'];
};


export type MutationUpdateUserResturnStringArgs = {
  args: UpdateUserInputType;
};

export type NewFiled = {
  __typename?: 'NewFiled';
  str: Scalars['String'];
};

export type NewResolveFiled = {
  __typename?: 'NewResolveFiled';
  getId: Scalars['String'];
  getName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getArgsName: GraphQlTest;
  getHello: GraphQlTest;
  getInfo: User;
  getUser: User;
};


export type QueryGetArgsNameArgs = {
  name: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subTest: Scalars['String'];
};


export type SubscriptionSubTestArgs = {
  subID: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  dsc: Scalars['String'];
  newField: NewResolveFiled;
  password: Scalars['String'];
  updateData: User;
  username: Scalars['String'];
};

export type UpdateUserInputType = {
  dsc: Scalars['String'];
};

export type ArgsTypeMutationVariables = Exact<{
  inputType: GRinputType;
  argsType: Scalars['String'];
}>;


export type ArgsTypeMutation = { __typename?: 'Mutation', getArgsType: { __typename?: 'GraphQLTest', name: string, NewField: { __typename?: 'NewFiled', str: string } }, getInputType: { __typename?: 'GraphQLTest', name: string, NewField: { __typename?: 'NewFiled', str: string } } };

export type PostSubMutationVariables = Exact<{
  str: Scalars['String'];
  postSub: Scalars['String'];
}>;


export type PostSubMutation = { __typename?: 'Mutation', postSub: string };

export type QueryTestQueryVariables = Exact<{
  argsName: Scalars['String'];
}>;


export type QueryTestQuery = { __typename?: 'Query', getHello: { __typename?: 'GraphQLTest', name: string, NewField: { __typename?: 'NewFiled', str: string } }, getArgsName: { __typename?: 'GraphQLTest', name: string, NewField: { __typename?: 'NewFiled', str: string } } };

export type SubTestSubscriptionVariables = Exact<{
  subID: Scalars['String'];
}>;


export type SubTestSubscription = { __typename?: 'Subscription', subTest: string };


export const ArgsTypeDocument = gql`
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

export function useArgsTypeMutation() {
  return Urql.useMutation<ArgsTypeMutation, ArgsTypeMutationVariables>(ArgsTypeDocument);
};
export const PostSubDocument = gql`
    mutation postSub($str: String!, $postSub: String!) {
  postSub(str: $str, postSub: $postSub)
}
    `;

export function usePostSubMutation() {
  return Urql.useMutation<PostSubMutation, PostSubMutationVariables>(PostSubDocument);
};
export const QueryTestDocument = gql`
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

export function useQueryTestQuery(options: Omit<Urql.UseQueryArgs<never, QueryTestQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QueryTestQuery>({ query: QueryTestDocument, ...options });
};
export const SubTestDocument = gql`
    subscription subTest($subID: String!) {
  subTest(subID: $subID)
}
    `;

export function useSubTestSubscription<R = SubTestSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, SubTestSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<SubTestSubscription, R>) {
  return Urql.useSubscription<SubTestSubscription, R, SubTestSubscriptionVariables>({ query: SubTestDocument, ...options }, handler);
};