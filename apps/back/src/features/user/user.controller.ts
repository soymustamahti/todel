import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserEntity } from 'src/features/user/user.entity';
import { UserService } from 'src/features/user/user.service';
import { UserCreateDto, UserUpdateDto } from 'src/features/user/user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizedUser } from 'src/shared/lib/decorators/user-type.decorator';
import { UserRole, User } from 'src/shared/lib/interfaces/user';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'List all users', description: 'List all users' })
  @AuthorizedUser(UserRole.ADMIN)
  public list(): Promise<UserEntity[]> {
    return this.userService.list();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    description: 'User id',
    type: 'string',
    required: true,
  })
  @ApiOperation({ summary: 'Get user by id', description: 'Get user by id' })
  @AuthorizedUser(UserRole.ADMIN)
  public get(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.get(id);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    description: 'User creation',
    type: UserCreateDto,
  })
  @ApiOperation({ summary: 'Create user', description: 'Create user' })
  @AuthorizedUser(UserRole.ADMIN)
  public create(@Body() user: UserCreateDto) {
    this.userService.create(user);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    description: 'User update',
    type: UserUpdateDto,
  })
  @ApiParam({
    name: 'id',
    description: 'User id',
    type: 'string',
    required: true,
  })
  @ApiOperation({ summary: 'Update user', description: 'Update user' })
  @AuthorizedUser(UserRole.ADMIN)
  public update(
    @Param('id') id: string,
    @Body() user: UserUpdateDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    description: 'User id',
    type: 'string',
    required: true,
  })
  @ApiOperation({ summary: 'Delete user', description: 'Delete user' })
  @AuthorizedUser(UserRole.ADMIN)
  public delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
