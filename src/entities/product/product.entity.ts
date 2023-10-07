import {
  BeforeSoftRemove,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { SummaryEntity } from '../inventory/summary.entity';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';

@Entity({ schema: 'product', name: 'product' })
export class ProductEntity extends MainEntity {
  @Index({ fulltext: true })
  @Column({ unique: true })
  title: string;

  @Index({ fulltext: true })
  @Column({ unique: true })
  original_title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

  @DeleteDateColumn()
  delete_at: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => SummaryEntity, (summaries) => summaries.product)
  summaries: SummaryEntity[];

  @ManyToOne(() => BrandEntity, (brandEntity) => brandEntity.products)
  @JoinColumn()
  brand: BrandEntity;

  @BeforeSoftRemove()
  beforeSoftRemove() {
    this.title = 'deleted_' + this.id + '_' + this.title;
    this.original_title = 'deleted_' + this.id + '_' + this.original_title;
    return this.save();
  }
}
