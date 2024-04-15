import { Module } from '@nestjs/common';
import { UserController } from 'src/features/user/user.controller';
import { UserService } from 'src/features/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/features/user/user.entity';
import { UserRepository } from 'src/features/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
