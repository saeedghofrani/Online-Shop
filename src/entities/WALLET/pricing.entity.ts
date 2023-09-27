import { ColumnNumericTransformer } from 'src/common/classes/column-numeric-transformer.class';
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { ProductEntity } from '../PRODUCT/product.entity';
import { OrderEntity } from './order.entity';

@Entity({ schema: 'wallet', name: 'pricing' })
export class PricingEntity extends MainEntity {
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @ManyToOne(() => ProductEntity, (product) => product.pricings)
  product: ProductEntity;

  @OneToMany(() => OrderEntity, (orders) => orders.price)
  orders: OrderEntity[];
  
  @DeleteDateColumn({ select: false })
  delete_at?: Date;
}
