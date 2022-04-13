import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const user = context.switchToHttp().getRequest()['user'];

    if (user) return true;

    return false;
  }
}

@Injectable()
export class AuthGuardGraphQL implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];

    if (user) return true;

    return false;
  }
}
