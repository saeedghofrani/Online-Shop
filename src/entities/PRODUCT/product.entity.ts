import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { SummaryEntity } from '../INVENTORY/summary.entity';
import { FileEntity } from '../public/file.entity';
import { CategoryEntity } from './category.entity';

@Entity({ schema: 'PRODUCT', name: 'product' })
export class ProductEntity extends MainEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => FileEntity, (file) => file.product)
  files: FileEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => SummaryEntity, (summaries) => summaries.product)
  summaries: SummaryEntity[];
}
