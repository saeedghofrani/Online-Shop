import { Column, Entity, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { ProductEntity } from './product.entity';

@Entity({ schema: 'product', name: 'brand' })
export class BrandEntity extends MainEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  original_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => ProductEntity, (productEntity) => productEntity.brand)
  products: ProductEntity[];
}
