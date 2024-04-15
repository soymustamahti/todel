import { PhotoEntity } from 'src/features/photo/photo.entity';
import { Album, AlbumPrivacy } from 'src/shared/lib/interfaces/album';
import { UserEntity } from 'src/features/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('albums')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: AlbumPrivacy, default: AlbumPrivacy.PUBLIC })
  privacy: AlbumPrivacy;

  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  createdAt: string; // iso string

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  updatedAt: string; // iso string

  @ManyToOne(() => UserEntity, (user) => user.albums)
  user: UserEntity;

  @ManyToMany(() => PhotoEntity, (photo) => photo.albums)
  @JoinTable({ name: 'albums_photos' })
  photos: PhotoEntity[];
}
