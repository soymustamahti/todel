import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_TYPE_KEY } from 'src/shared/lib/decorators/user-type.decorator';
import { User } from 'src/shared/lib/interfaces/user';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const userTypes = this.reflector.getAllAndOverride<string[]>(
      USER_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!userTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return userTypes.some((t) => t === user.role);
  }
}
