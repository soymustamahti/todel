import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoEntity } from 'src/features/photo/photo.entity';

export class PhotoRepository extends Repository<PhotoEntity> {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {
    super(
      photoRepository.target,
      photoRepository.manager,
      photoRepository.queryRunner,
    );
  }

  public async addPictureToAlbum(albumId: string, photoId: string) {
    return this.photoRepository
      .createQueryBuilder()
      .relation('albums')
      .of(photoId)
      .add(albumId);
  }

  public async removePictureFromAlbum(albumId: string, photoId: string) {
    return this.photoRepository
      .createQueryBuilder()
      .relation('albums')
      .of(photoId)
      .remove(albumId);
  }
}
