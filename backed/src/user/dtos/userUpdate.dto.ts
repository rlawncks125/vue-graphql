import {
  ArgsType,
  InputType,
  PickType as GraphQLPickType,
} from '@nestjs/graphql';
import { PartialType, PickType } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class UserUpdateDto extends PartialType(
  PickType(User, ['password', 'dsc']),
) {}

// GraphQL 선언

// GraphQL inputType 선언
@InputType()
export class updateUserInputType extends GraphQLPickType(
  User,
  ['dsc'] as const,
  InputType,
) {}

// GraphQL ArgType 선언
@ArgsType()
export class updateUserArgsType extends GraphQLPickType(
  User,
  ['dsc'] as const,
  ArgsType,
) {}
