import { Module } from '@nestjs/common';
import { PhotoController } from 'src/features/photo/photo.controller';
import { PhotoService } from 'src/features/photo/photo.service';
import { MinioClientModule } from 'src/shared/minio-client/minio-client.module';
import { PhotoRepository } from 'src/features/photo/photo.repository';
import { PhotoEntity } from 'src/features/photo/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/features/album/album.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhotoEntity]),
    MinioClientModule,
    AlbumModule,
  ],
  controllers: [PhotoController],
  providers: [PhotoService, PhotoRepository],
})
export class PhotoModule {}
