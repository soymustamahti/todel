import { Album } from 'src/shared/lib/interfaces/album';
import { Friend } from 'src/shared/lib/interfaces/friend';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface User {
  id: string; // uuid
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: string;
  birthDate?: string; // iso string
  role: UserRole;
  privacy: UserPrivacy;
  refreshToken: string;
  createdAt: string; // iso string
  updatedAt: string; // iso string
  deactivatedAt?: string; // iso string
  lastLoginAt?: string; // iso string
  albums?: Album[];
  sentFriendRequests?: Friend[];
  receivedFriendRequests?: Friend[];
}
