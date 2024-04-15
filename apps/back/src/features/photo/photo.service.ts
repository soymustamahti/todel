import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MinioClientService } from 'src/shared/minio-client/minio-client.service';
import { PhotoRepository } from 'src/features/photo/photo.repository';
import { User } from 'src/shared/lib/interfaces/user';
import { AlbumService } from 'src/features/album/album.service';
import * as ExifParser from 'exif-parser';
import { PhotoEntity } from 'src/features/photo/photo.entity';

// https://github.com/ianare/exif-samples
// to test with exif data
@Injectable()
export class PhotoService {
  constructor(
    private minioClientService: MinioClientService,
    private readonly photoRepository: PhotoRepository,
    private readonly albumService: AlbumService,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    const exifData = await ExifParser.create(file.buffer).parse();
    const res = await this.minioClientService.upload(file);
    const photo = this.photoRepository.create({
      filename: res.filename,
      mimetype: file.mimetype,
      name: file.originalname,
      size: file.size,
      thumbnailFileName: res.thumbnailFileName,
      latitude: exifData.tags.GPSLatitude,
      longitude: exifData.tags.GPSLongitude,
    });
    await this.photoRepository.save(photo);
  }

  public async get(id: string) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    if (!photo) throw new NotFoundException('Photo not found');
    return {
      url: await this.minioClientService.getPresignedUrl(photo.filename),
    };
  }

  public async delete(id: string) {
    const photo = await this.photoRepository.findOne({ where: { id } });
    if (!photo) throw new NotFoundException('Photo not found');
    await this.minioClientService.delete(photo.filename);
    await this.minioClientService.delete(photo.thumbnailFileName);
    await this.photoRepository.delete(id);
  }

  public addPictureToAlbum(user: User, albumId: string, photoId: string) {
    const album = this.albumService.checkAlbumOwner(user, albumId);
    if (!album)
      throw new ForbiddenException('You are not the owner of this album');
    return this.photoRepository.addPictureToAlbum(albumId, photoId);
  }

  public removePictureFromAlbum(user: User, albumId: string, photoId: string) {
    const album = this.albumService.checkAlbumOwner(user, albumId);
    if (!album)
      throw new ForbiddenException('You are not the owner of this album');
    return this.photoRepository.removePictureFromAlbum(albumId, photoId);
  }
  // maxDistance in km
  public async findNearbyPhotos(
    latitude: number,
    longitude: number,
    maxDistance: number = 10,
  ): Promise<PhotoEntity[]> {
    const allPhotos = await this.photoRepository.find();

    const nearbyPhotos = allPhotos.filter((photo) => {
      if (photo.latitude && photo.longitude) {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          photo.latitude,
          photo.longitude,
        );
        return distance <= maxDistance;
      }
      return false;
    });

    nearbyPhotos.sort((a, b) => {
      const distanceA = this.calculateDistance(
        latitude,
        longitude,
        a.latitude,
        a.longitude,
      );
      const distanceB = this.calculateDistance(
        latitude,
        longitude,
        b.latitude,
        b.longitude,
      );
      return distanceA - distanceB;
    });

    return nearbyPhotos;
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
