import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { SummaryEntity } from '../INVENTORY/summary.entity';
import { PricingEntity } from '../WALLET/pricing.entity';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';
import { ProductAttributeValueEntity } from './product-attribute-value.entity';

@Entity({ schema: 'product', name: 'product' })
export class ProductEntity extends MainEntity {
  @Index({ fulltext: true })
  @Column({ unique: true })
  title: string;

  @Index({ fulltext: true })
  @Column({ unique: true })
  original_title: string;

  @Column()
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => SummaryEntity, (summaries) => summaries.product)
  summaries: SummaryEntity[];

  @OneToMany(() => PricingEntity, (pricings) => pricings.product)
  pricings: PricingEntity[];

  @OneToMany(
    () => ProductAttributeValueEntity,
    (product_attributes_value) => product_attributes_value.product,
  )
  product_attributes_value: ProductAttributeValueEntity[];

  @ManyToOne(() => BrandEntity, (brandEntity) => brandEntity.products)
  @JoinColumn()
  brand: BrandEntity;
}
