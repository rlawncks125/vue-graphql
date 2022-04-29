import { UseGuards } from '@nestjs/common';
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
import { AuthGuardGraphQL } from 'src/auth/auth.guard';
import { authUserGraphQL } from 'src/auth/authUser.decorator';
import { User } from 'src/user/entities/user.entity';

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

  // subscription 테스트
  @UseGuards(AuthGuardGraphQL)
  @Subscription((returns) => String, {
    name: 'subTest',
    // payload publish로 보낸 데이터
    // variables 는 @Args로 받은 데이터
    filter: (payload: any, variables: any) => {
      return payload.postSub === variables.subID;
    },
  })
  subTest(@Args('subID') subID: string, @authUserGraphQL() user: User) {
    console.log('구독 활성화 +', user.username);
    return pubSub.asyncIterator('subTest');
  }

  @Mutation((returns) => String)
  @UseGuards(AuthGuardGraphQL)
  postSub(
    @Args('str', { type: () => String }) str: string,
    @Args('postSub', { type: () => String }) postSub: string,
    @authUserGraphQL() user: User,
  ) {
    pubSub.publish('subTest', {
      subTest: `${user.username} : ${str}`,
      postSub,
    });
    return str;
  }
}
