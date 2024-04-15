import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/features/album/album.entity';
import { UserEntity } from 'src/features/user/user.entity';
import { AlbumDto } from 'src/features/album/album.dto';
import { AlbumPrivacy } from 'src/shared/lib/interfaces/album';

export class AlbumRepository extends Repository<AlbumEntity> {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {
    super(
      albumRepository.target,
      albumRepository.manager,
      albumRepository.queryRunner,
    );
  }

  public getAllMyAlbums(userId: string): Promise<AlbumEntity[]> {
    return this.createQueryBuilder('a')
      .where('a.user = :userId', { userId })
      .getMany();
  }

  public getPublicAlbumsFormUser(userId: string): Promise<AlbumEntity[]> {
    return this.createQueryBuilder('a')
      .where('a.user = :userId', { userId })
      .andWhere('a.privacy = :privacy', { privacy: AlbumPrivacy.PUBLIC })
      .getMany();
  }

  public getAllMyPrivateOrPublicAlbums(
    userId: string,
    privacy: string,
  ): Promise<AlbumEntity[]> {
    return this.createQueryBuilder('a')
      .where('a.user = :userId', { userId })
      .andWhere('a.privacy = :privacy', { privacy: privacy })
      .getMany();
  }

  public createAlbum(userInfos: UserEntity, album: AlbumDto) {
    this.createQueryBuilder('a')
      .insert()
      .into(AlbumEntity)
      .values({ ...album, user: userInfos })
      .execute()
      .then(() => album);
  }

  public updateAlbum(userInfos: UserEntity, albumId: string, album: AlbumDto) {
    this.createQueryBuilder('a')
      .update(AlbumEntity)
      .set(album)
      .where('id = :albumId', { albumId })
      .andWhere('user = :userId', { userId: userInfos.id })
      .execute()
      .then(() => album);
  }

  public deleteAlbum(userInfos: UserEntity, albumId: string) {
    this.createQueryBuilder('a')
      .delete()
      .from(AlbumEntity)
      .where('id = :albumId', { albumId })
      .andWhere('user = :userId', { userId: userInfos.id })
      .execute();
  }

  public checkAlbumOwner(userInfos: UserEntity, albumId: string) {
    return this.createQueryBuilder('a')
      .where('a.id = :albumId', { albumId })
      .andWhere('a.user = :userId', { userId: userInfos.id })
      .getOne();
  }
}
