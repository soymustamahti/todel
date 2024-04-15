import { Module } from '@nestjs/common';
import { MinioClientService } from 'src/shared/minio-client/minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import environment from 'environments/environment';

@Module({
  imports: [
    MinioModule.register({
      endPoint: environment.minio.endpoint,
      port: environment.minio.port,
      useSSL: environment.minio.useSSL,
      accessKey: environment.minio.accessKey,
      secretKey: environment.minio.secretKey,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
