import { Friend } from 'src/shared/lib/interfaces/friend';
import { UserEntity } from 'src/features/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('friend')
@Index(['sender', 'receiver'], { unique: true })
export class FriendEntity implements Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.sentFriendRequests)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.receivedFriendRequests)
  receiver: UserEntity;

  @Column({ default: false })
  accepted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  createdAt: string; // iso string

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  updatedAt: string; // iso string
}
