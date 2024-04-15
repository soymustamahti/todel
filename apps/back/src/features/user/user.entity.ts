import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole, User, UserPrivacy } from 'src/shared/lib/interfaces/user';
import { AlbumEntity } from 'src/features/album/album.entity';
import { FriendEntity } from 'src/features/friend/friend.entity';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Using an uuid instead of an auto increment for security purpose',
  })
  id: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  username: string;

  @Column({ unique: false, nullable: true })
  firstName: string;

  @Column({ unique: false, nullable: true })
  lastName: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ unique: true, nullable: true })
  birthDate?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'enum', enum: UserPrivacy, default: UserPrivacy.PRIVATE })
  privacy: UserPrivacy;

  @Column({ nullable: true, select: false })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  createdAt: string; // iso string

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  updatedAt: string; // iso string

  @Column({ type: 'timestamp', nullable: true })
  deactivatedAt?: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt?: string;

  @OneToMany(() => AlbumEntity, (album) => album.user)
  albums?: AlbumEntity[];

  @OneToMany(() => FriendEntity, (friendship) => friendship.sender)
  sentFriendRequests?: FriendEntity[];

  @OneToMany(() => FriendEntity, (friendship) => friendship.receiver)
  receivedFriendRequests?: FriendEntity[];
}
