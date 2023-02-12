import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../AUTH/user.entity';
import { ProductEntity } from '../PRODUCT/product.entity';

@Entity({ schema: 'public', name: 'file' })
export class FileEntity extends MainEntity {
  @Column()
  file_name: string;

  @Column()
  mime_type: string;

  @Column()
  ext: string;

  @Column()
  size: number;

  @Column()
  old_path: string;

  @Column()
  new_path: string;

  @ManyToOne(() => UserEntity, (user) => user.files, {
    cascade: true,
  })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.files)
  product: ProductEntity;
}
