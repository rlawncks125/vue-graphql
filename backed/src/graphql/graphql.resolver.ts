import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GraphqlResolver {
  @Query(() => String)
  getHello() {
    return 'HELLO GraphQL';
  }
}
