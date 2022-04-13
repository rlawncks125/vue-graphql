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
} from '@nestjs/graphql';
import { AuthGuardGraphQL } from 'src/auth/auth.guard';
import { authUserGraphQL } from 'src/auth/authUser.decorator';
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

  @Mutation((returns) => User)
  @UseGuards(AuthGuardGraphQL)
  async updateUser(
    @authUserGraphQL() user: User,
    @Args('dsc', { type: () => String }) dsc: string,
  ) {
    return this.userService.update(user, { dsc });
  }

  @ResolveField('updateData', (returns) => User)
  async updateData(@Parent() user: User) {
    return this.userService.findById(user.id);
  }

  @ResolveField('newField', (returns) => NewFiled)
  async testUser(@Parent() user: User) {
    return {
      getId: user.id,
      getName: user.username,
    };
  }
}

@ObjectType()
class NewFiled {
  @Field((type) => String)
  getId: string;

  @Field((type) => String)
  getName: string;
}
