import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FriendRepository } from 'src/features/friend/friend.repository';
import { User, UserPrivacy } from 'src/shared/lib/interfaces/user';
import { FriendDto } from 'src/features/friend/friend.dto';
import { UserService } from 'src/features/user/user.service';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository,
    private userService: UserService,
  ) {}

  public async getNotAcceptedFriendsRequests(user: User) {
    return this.friendRepository.find({
      where: {
        receiver: user,
        accepted: false,
      },
      relations: ['sender'],
    });
  }

  public async getAcceptedFriends(user: User) {
    return this.friendRepository.find({
      where: {
        receiver: user,
        accepted: true,
      },
      relations: ['sender'],
    });
  }

  public async friendRequest(user: User, friend: FriendDto) {
    try {
      const userToBeFriend = await this.userService.get(friend.userId);
      if (user.id === userToBeFriend.id) {
        throw new HttpException(
          'You cannot be friend with yourself',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.friendRepository.friendRequest(
        user,
        userToBeFriend,
        UserPrivacy.PUBLIC === userToBeFriend.privacy,
      );
    } catch (e) {
      if (e.code === '23505') {
        throw new HttpException(
          'Friend request already sent',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  public async acceptFriendRequest(user: User, idRequest: string) {
    return this.friendRepository.acceptFriendRequest(user, idRequest);
  }

  public async deleteFriend(user: User, id: string) {
    return this.friendRepository.deleteFriend(user, id);
  }
}
