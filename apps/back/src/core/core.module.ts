import { Module } from '@nestjs/common';
import { UserModule } from 'src/features/user/user.module';
import { dbdatasource } from 'data.source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/core/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { UserTypeGuard } from 'src/core/auth/guards/user-type.guard';
import { AlbumModule } from 'src/features/album/album.module';
import { PhotoModule } from 'src/features/photo/photo.module';
import { MinioClientModule } from 'src/shared/minio-client/minio-client.module';
import { FriendModule } from 'src/features/friend/friend.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    UserModule,
    AuthModule,
    AlbumModule,
    PhotoModule,
    MinioClientModule,
    FriendModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserTypeGuard,
    },
  ],
})
export class AppModule {}
