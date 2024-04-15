import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as crypto from 'crypto';
import environment from 'environments/environment';
import * as sharp from 'sharp';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = environment.minio.bucket;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(
    file: Express.Multer.File,
    baseBucket: string = this.baseBucket,
  ) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };
    const filename = hashedFileName + ext;
    const fileName = `${filename}`;
    const thumbnailFileName = `thumbnails-${filename}`;
    const thumbnailBuffer = await this.createThumbnail(file.buffer);

    this.client.putObject(
      baseBucket,
      fileName,
      file.buffer,
      file.buffer.length,
      metaData,
      function (err, res) {
        if (err)
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
        this.client.putObject(
          baseBucket,
          `thumbnails-${fileName}`,
          thumbnailBuffer,
          thumbnailBuffer.length,
          metaData,
          function (err, res) {
            if (err)
              throw new HttpException(
                'Error uploading file',
                HttpStatus.BAD_REQUEST,
              );
          },
        );
      },
    );

    return {
      filename,
      thumbnailFileName,
    };
  }

  public async getPresignedUrl(filename: string) {
    return `${environment.minio.endpoint}:${environment.minio.port}/${environment.minio.bucket}/${filename}`;
  }

  public async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, {}, (err) => {
      if (err)
        throw new HttpException(
          'Oops Something wrong happend',
          HttpStatus.BAD_REQUEST,
        );
    });
  }

  private async createThumbnail(buffer: Buffer) {
    return sharp(buffer).resize(200, 200).toBuffer();
  }
}
