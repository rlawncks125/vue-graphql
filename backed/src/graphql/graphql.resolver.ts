import {
  Args,
  ArgsType,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Parent,
  PickType,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

@ObjectType()
class GraphQLTest {
  @Field(() => String)
  name: string;

  @Field(() => [String], { nullable: true })
  array?: string[];
}

@ObjectType()
class NewFiled {
  @Field(() => String)
  str: string;
}

@ArgsType()
class GRargsType extends PickType(GraphQLTest, ['name'] as const, ArgsType) {}

@InputType()
class GRinputType extends PickType(GraphQLTest, ['name'] as const, InputType) {}

const pubSub = new PubSub();

// Resolver 시작
@Resolver((of) => GraphQLTest)
export class GraphqlResolver {
  @Query(() => GraphQLTest)
  getHello(): GraphQLTest {
    return {
      name: 'hellp',
      array: ['s', 'w'],
    };
  }

  // Args 타입없이 쓸시
  @Query(() => GraphQLTest)
  getArgsName(@Args('name', { type: () => String }) name: string): GraphQLTest {
    return {
      name,
      array: ['z', 'x'],
    };
  }

  // Args타입
  @Mutation(() => GraphQLTest)
  getArgsType(@Args() GRargsType: GRargsType): GraphQLTest {
    return GRargsType;
  }
  // Input타입
  @Mutation(() => GraphQLTest)
  getInputType(@Args('argsStr') GRinputType: GRinputType): GraphQLTest {
    return GRinputType;
  }

  // ResolveFild
  // 출력될 Resolver(여기선 GraphQLTest)값에 Field를 추가
  @ResolveField('NewField', () => NewFiled)
  NewField(@Parent() graphqltest: GraphQLTest): NewFiled {
    return { str: 'new Field ' + graphqltest.name };
  }

  @Subscription((returns) => String, {
    name: 'subTest',
    filter: (payload: any, variables: any) => {
      console.log(payload, variables);
      return payload.postSub === variables.subID;
    },
  })
  subTest(@Args('subID') subID: string) {
    return pubSub.asyncIterator('subTest');
  }

  @Mutation((returns) => String)
  postSub(
    @Args('str', { type: () => String }) str: string,
    @Args('postSub', { type: () => String }) postSub: string,
  ) {
    pubSub.publish('subTest', { subTest: str, postSub });
    return str;
  }
}
