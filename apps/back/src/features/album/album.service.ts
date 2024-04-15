import { Injectable } from '@nestjs/common';
import { AlbumRepository } from 'src/features/album/album.repository';
import { User } from 'src/shared/lib/interfaces/user';
import { UserService } from 'src/features/user/user.service';
import { AlbumDto } from 'src/features/album/album.dto';
import { AlbumEntity } from 'src/features/album/album.entity';
import { AlbumPrivacy } from 'src/shared/lib/interfaces/album';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly userService: UserService,
  ) {}

  public async getAllMyAlbums(user: User): Promise<AlbumEntity[]> {
    return this.albumRepository.getAllMyAlbums(user.id);
  }

  public async getPublicAlbumsFormUser(id: string): Promise<AlbumEntity[]> {
    return this.albumRepository.getPublicAlbumsFormUser(id);
  }

  public async getAllMyPrivateAlbums(user: User): Promise<AlbumEntity[]> {
    return this.albumRepository.getAllMyPrivateOrPublicAlbums(
      user.id,
      AlbumPrivacy.PRIVATE,
    );
  }

  public getAllMyPublicAlbums(user: User): Promise<AlbumEntity[]> {
    return this.albumRepository.getAllMyPrivateOrPublicAlbums(
      user.id,
      AlbumPrivacy.PUBLIC,
    );
  }

  public async create(user: User, album: AlbumDto) {
    const userInfos = await this.userService.get(user.id);
    this.albumRepository.createAlbum(userInfos, album);
  }

  public async update(user: User, albumId: string, album: AlbumDto) {
    const userInfos = await this.userService.get(user.id);
    this.albumRepository.updateAlbum(userInfos, albumId, album);
  }

  public async delete(user: User, albumId: string) {
    const userInfos = await this.userService.get(user.id);
    this.albumRepository.deleteAlbum(userInfos, albumId);
  }

  public async checkAlbumOwner(user: User, albumId: string) {
    const userInfos = await this.userService.get(user.id);
    return this.albumRepository.checkAlbumOwner(userInfos, albumId);
  }
}
