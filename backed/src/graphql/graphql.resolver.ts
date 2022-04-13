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
} from '@nestjs/graphql';

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
}
