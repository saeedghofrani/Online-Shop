import { KafkaJSTopicMetadataNotLoaded } from '@nestjs/microservices/external/kafka.interface';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { SummaryEntity } from '../INVENTORY/summary.entity';
import { FileEntity } from '../public/file.entity';
import { PricingEntity } from '../WALLET/pricing.entity';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';
import { ProductAttributeEntity } from './product-attribute.entity';

@Entity({ schema: 'product', name: 'product' })
export class ProductEntity extends MainEntity {
  @Column()
  name: string;

  @Column()
  original_name: string;

  @Column()
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => SummaryEntity, (summaries) => summaries.product)
  summaries: SummaryEntity[];

  @OneToMany(() => PricingEntity, (pricings) => pricings.product)
  pricings: PricingEntity[];

  @OneToMany(
    () => ProductAttributeEntity,
    (product_attributes) => product_attributes.product,
  )
  product_attributes: ProductAttributeEntity[];

  @ManyToOne(() => BrandEntity, (brandEntity) => brandEntity.products)
  @JoinColumn()
  brand: BrandEntity;
}
