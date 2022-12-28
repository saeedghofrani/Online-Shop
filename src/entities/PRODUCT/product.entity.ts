import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { SummaryEntity } from '../INVENTORY/summary.entity';
import { FileEntity } from '../public/file.entity';
import { PaymentEntity } from '../WALLET/payment.entity';
import { PricingEntity } from '../WALLET/pricing.entity';
import { CategoryEntity } from './category.entity';

@Entity({ schema: 'product', name: 'product' })
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

  @OneToMany(() => PaymentEntity, (payments) => payments.product)
  payments: PaymentEntity[];

  @OneToMany(() => PricingEntity, (pricings) => pricings.product)
  pricings: PricingEntity[];
}
