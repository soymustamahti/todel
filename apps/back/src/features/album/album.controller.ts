import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AlbumService } from 'src/features/album/album.service';
import { Request } from 'express';
import { User } from 'src/shared/lib/interfaces/user';
import { AlbumDto, AlbumUpdateDto } from 'src/features/album/album.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AlbumEntity } from 'src/features/album/album.entity';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List all albums from current authenticated user',
    description: 'List all albums from current authenticated user',
  })
  public async getAlbumsFromUser(@Req() req: Request): Promise<AlbumEntity[]> {
    return this.albumService.getAllMyAlbums(req.user as User);
  }

  @Get('public/:id')
  //todo change so it gets on album by id
  //in the front will manage the public/private
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    description: 'User id',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'List all public albums from user',
    description: 'List all public albums from user',
  })
  public async getPublicAlbumsFromUser(
    @Param('id') id: string,
  ): Promise<AlbumEntity[]> {
    return this.albumService.getPublicAlbumsFormUser(id);
  }

  @Get('private')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List all private albums from user',
    description: 'List all private albums from user',
  })
  public async getAllMyPrivateAlbums(
    @Req() req: Request,
  ): Promise<AlbumEntity[]> {
    return this.albumService.getAllMyPrivateAlbums(req.user as User);
  }

  @Get('public')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List all public albums from the current authenticated user',
    description: 'List all public albums from the current authenticated user',
  })
  public async getAllMyPublicAlbums(
    @Req() req: Request,
  ): Promise<AlbumEntity[]> {
    return this.albumService.getAllMyPublicAlbums(req.user as User);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    description: 'Album creation',
    type: AlbumDto,
  })
  @ApiOperation({
    summary: 'Create album for the current authenticated user',
    description: 'Create album for the current authenticated user',
  })
  public async createAlbum(@Body() album: AlbumDto, @Req() req: Request) {
    return this.albumService.create(req.user as User, album);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    description: 'Album update',
    type: AlbumUpdateDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Album id',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Update album of the current authenticated user',
    description: 'Update album of the current authenticated user',
  })
  public async updateAlbum(
    @Body() album: AlbumUpdateDto,
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    return this.albumService.update(req.user as User, id, album);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    description: 'Album id',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Delete album of the current authenticated user',
    description: 'Delete album of the current authenticated user',
  })
  public async deleteAlbum(@Req() req: Request, @Param('id') id: string) {
    return this.albumService.delete(req.user as User, id);
  }
}
