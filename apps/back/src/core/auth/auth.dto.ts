import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsEmail({}, { message: 'Email must be a valid email' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password: string;
}

export class AuthSignUpDto extends AuthLoginDto {}

export class AuthCompleteSignUpDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username must not be empty' })
  username: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name must not be empty' })
  firstName: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name must not be empty' })
  lastName: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number must not be empty' })
  phoneNumber: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Birth date must be a string' })
  @IsNotEmpty({ message: 'Birth date must not be empty' })
  birthDate: string;
}

export class AuthRefreshTokenDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString({ message: 'Refresh token must be a string' })
  @IsNotEmpty({ message: 'Refresh token must not be empty' })
  refreshToken: string;
}
