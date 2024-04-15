import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from 'src/features/photo/photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { User } from 'src/shared/lib/interfaces/user';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Photos')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    description: 'Photo id',
    type: 'string',
    required: true,
  })
  @ApiOperation({ summary: 'Get photo by id', description: 'Get photo by id' })
  public async get(@Param('id') id: string) {
    return this.photoService.get(id);
  }

  @Post('upload')
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload a photo', description: 'Upload a photo' })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.photoService.uploadFile(file);
  }

  @Post('add-to-album/:albumId/:photoId')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'albumId',
    description: 'Album id',
    type: 'string',
    required: true,
  })
  @ApiParam({
    name: 'photoId',
    description: 'Photo id',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Add photo to album',
    description: 'Add photo to album',
  })
  public async addPictureToAlbum(
    @Param('albumId') albumId: string,
    @Param('photoId') photoId: string,
    @Req() req: Request,
  ) {
    return this.photoService.addPictureToAlbum(
      req.user as User,
      albumId,
      photoId,
    );
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    description: 'Photo id',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Delete photo by id',
    description: 'Delete photo by id',
  })
  public async delete(@Param('id') id: string) {
    return this.photoService.delete(id);
  }

  @Delete('remove-from-album/:albumId/:photoId')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'albumId',
    description: 'Album id',
    type: 'string',
    required: true,
  })
  @ApiParam({
    name: 'photoId',
    description: 'Photo id',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Remove photo from album',
    description: 'Remove photo from album',
  })
  public async removePictureFromAlbum(
    @Param('albumId') albumId: string,
    @Param('photoId') photoId: string,
    @Req() req: Request,
  ) {
    return this.photoService.removePictureFromAlbum(
      req.user as User,
      albumId,
      photoId,
    );
  }

  @Get('nearby/:latitude/:longitude')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'latitude',
    description: 'Latitude',
    type: 'number',
    required: true,
  })
  @ApiParam({
    name: 'longitude',
    description: 'Longitude',
    type: 'number',
    required: true,
  })
  @ApiOperation({
    summary: 'Find nearby photos',
    description: 'Find nearby photos',
  })
  public async findNearbyPhotos(
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number,
  ) {
    return this.photoService.findNearbyPhotos(latitude, longitude, 50);
  }
}
