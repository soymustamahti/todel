import { Module } from '@nestjs/common';
import { AlbumController } from 'src/features/album/album.controller';
import { AlbumService } from 'src/features/album/album.service';
import { AlbumRepository } from 'src/features/album/album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/features/album/album.entity';
import { UserModule } from 'src/features/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), UserModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService, AlbumRepository],
})
export class AlbumModule {}
