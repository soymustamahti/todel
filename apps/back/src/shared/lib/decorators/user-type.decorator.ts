import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/shared/lib/interfaces/user';

export const USER_TYPE_KEY = 'userType';
export const AuthorizedUser = (...roles: UserRole[]) =>
  SetMetadata(USER_TYPE_KEY, roles);
