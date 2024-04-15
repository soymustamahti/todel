import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AlbumPrivacy } from 'src/shared/lib/interfaces/album';

export class AlbumDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  title: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
  @ApiProperty({
    type: 'string',
    required: false,
    default: AlbumPrivacy.PUBLIC,
  })
  @IsEnum(AlbumPrivacy, { message: 'Privacy must be a valid enum value' })
  @IsOptional()
  privacy: AlbumPrivacy;
}

export class AlbumUpdateDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  title: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsEnum(AlbumPrivacy, { message: 'Privacy must be a valid enum value' })
  @IsOptional()
  privacy: AlbumPrivacy;
}
