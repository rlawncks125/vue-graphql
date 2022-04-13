import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  ObjectType,
  Field,
  Mutation,
  InputType,
  PickType,
} from '@nestjs/graphql';
import { AuthGuardGraphQL } from 'src/auth/auth.guard';
import { authUserGraphQL } from 'src/auth/authUser.decorator';
import { updateUserArgsType, updateUserInputType } from './dtos/userUpdate.dto';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  @UseGuards(AuthGuardGraphQL)
  async getInfo(@authUserGraphQL() user: User) {
    return this.userService.findById(user.id);
  }

  @Query((returns) => User)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  // @ArgsType
  @Mutation((returns) => User)
  @UseGuards(AuthGuardGraphQL)
  async updateUser(
    @authUserGraphQL() user: User,
    @Args() { dsc }: updateUserArgsType,
  ) {
    return this.userService.update(user, { dsc });
  }

  // @InputType
  @Mutation((returns) => String)
  @UseGuards(AuthGuardGraphQL)
  async updateUserResturnString(
    @authUserGraphQL() user: User,
    @Args('args') { dsc }: updateUserInputType,
  ) {
    return this.userService.update(user, { dsc });
  }

  // ResolveFild : 출력될 Resolver(여기선 User)값에 FIeld를 추가
  @ResolveField('updateData', (returns) => User)
  async updateData(@Parent() user: User) {
    return this.userService.findById(user.id);
  }

  @ResolveField('newField', (returns) => NewResolveFiled)
  async testUser(@Parent() user: User) {
    return {
      getId: user.id,
      getName: user.username,
    };
  }
}

@ObjectType()
class NewResolveFiled {
  @Field((type) => String)
  getId: string;

  @Field((type) => String)
  getName: string;
}
