import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../AUTH/user.entity';
import { FileTypeEnum } from './enum/file-type.enum';

@Entity({ schema: 'public', name: 'file' })
export class FileEntity extends MainEntity {
  @Column()
  originalName: string;

  @Column()
  file_name: string;

  @Column()
  mime_type: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column()
  compressedFileName: string;

  @Index({ fulltext: true })
  @Column({ nullable: false, unique: false })
  relation_id: string;

  @Column({
    type: 'enum',
    enum: FileTypeEnum,
    default: FileTypeEnum.PRODUCT,
  })
  type: FileTypeEnum;

  @ManyToOne(() => UserEntity, (user) => user.files, {
    cascade: true,
  })
  user: UserEntity;
}
