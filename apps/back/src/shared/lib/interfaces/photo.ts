import { Album } from 'src/shared/lib/interfaces/album';

export interface Photo {
  id: string; // uuid
  filename: string;
  mimetype: string;
  name: string;
  size: number;
  thumbnailFileName: string;
  latitude?: number;
  longitude?: number;
  createdAt: string; // iso string
  updatedAt: string; // iso string
  albums?: Album[];
}
