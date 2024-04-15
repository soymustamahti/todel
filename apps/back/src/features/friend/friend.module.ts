import { Module } from '@nestjs/common';
import { FriendController } from 'src/features/friend/friend.controller';
import { FriendService } from 'src/features/friend/friend.service';
import { FriendRepository } from 'src/features/friend/friend.repository';
import { FriendEntity } from 'src/features/friend/friend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/features/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FriendEntity]), UserModule],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
  exports: [FriendService, FriendRepository],
})
export class FriendModule {}
