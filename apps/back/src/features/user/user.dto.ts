import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/shared/lib/interfaces/user';

export class UserCreateDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Le prénom est requis' })
  firstName: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Le nom est requis' })
  lastName: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsEmail({}, { message: "L'email n'est pas valide" })
  email: string;
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  password: string;
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  phoneNumber: string;
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  birthDate: string;
}

export class UserUpdateDto {
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  @IsEmail()
  email: string;
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  firstName: string;
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  lastName: string;
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  phoneNumber: string;
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  birthDate: string;
}
