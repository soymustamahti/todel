import { AlbumEntity } from 'src/features/album/album.entity';
import { Photo } from 'src/shared/lib/interfaces/photo';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('photo')
export class PhotoEntity implements Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  filename: string;

  @Column({ nullable: false })
  mimetype: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  size: number;

  @Column({ nullable: true })
  thumbnailFileName: string;

  @Column({ nullable: true, type: 'float' })
  latitude?: number;

  @Column({ nullable: true, type: 'float' })
  longitude?: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  createdAt: string; // iso string

  @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  updatedAt: string; // iso string

  @ManyToMany(() => AlbumEntity, (album) => album.photos)
  albums?: AlbumEntity[];
}
