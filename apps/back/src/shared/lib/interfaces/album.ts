import { Photo } from 'src/shared/lib/interfaces/photo';
import { User } from 'src/shared/lib/interfaces/user';

export interface Album {
  id: string; // uuid
  title: string;
  description?: string;
  privacy: AlbumPrivacy;
  createdAt: string; // iso string
  updatedAt: string; // iso string
  user: User;
  photos: Photo[];
}

export enum AlbumPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
