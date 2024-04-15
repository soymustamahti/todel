import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from 'src/features/friend/friend.entity';
import { User, UserPrivacy } from 'src/shared/lib/interfaces/user';

export class FriendRepository extends Repository<FriendEntity> {
  constructor(
    @InjectRepository(FriendEntity)
    private readonly friendRepository: Repository<FriendEntity>,
  ) {
    super(
      friendRepository.target,
      friendRepository.manager,
      friendRepository.queryRunner,
    );
  }

  public async getNotAcceptedFriendsRequests(user: User) {
    return this.friendRepository
      .createQueryBuilder('f')
      .where('receiver = :receiverId', { receiverId: user.id })
      .andWhere('accepted = false')
      .getMany();
  }

  public async getAcceptedFriends(user: User) {
    return this.friendRepository
      .createQueryBuilder('f')
      .where('receiver = :receiverId', { receiverId: user.id })
      .andWhere('accepted = true')
      .getMany();
  }

  public async friendRequest(
    user: User,
    friend: User,
    acceptDirectly: boolean,
  ) {
    return this.friendRepository
      .createQueryBuilder('f')
      .insert()
      .into(FriendEntity)
      .values({ sender: user, receiver: friend, accepted: acceptDirectly })
      .execute();
  }

  public async acceptFriendRequest(user: User, id: string) {
    return this.friendRepository
      .createQueryBuilder('f')
      .update(FriendEntity)
      .set({ accepted: true })
      .where('id = :id', { id })
      .andWhere('receiverId = :receiverId', { receiverId: user.id })
      .execute();
  }

  public async deleteFriend(user: User, id: string) {
    return this.friendRepository
      .createQueryBuilder('f')
      .delete()
      .from(FriendEntity)
      .where('id = :id', { id })
      .andWhere('senderId = :senderId', { senderId: user.id })
      .orWhere('receiverId = :receiverId', { receiverId: user.id })
      .execute();
  }
}
