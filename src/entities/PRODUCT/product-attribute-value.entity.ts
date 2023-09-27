import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { AttributeValueEntity } from './attribute-value.entity';
import { ProductEntity } from './product.entity';
import { ProviderEntity } from '../INVENTORY/provider.entity';
import { ColumnNumericTransformer } from 'src/common/classes/column-numeric-transformer.class';
import { OrderEntity } from '../WALLET/order.entity';

@Entity({ schema: 'product', name: 'product_attribute_value' })
export class ProductAttributeValueEntity extends MainEntity {
  @ManyToOne(
    () => AttributeValueEntity,
    (attribute_value) => attribute_value.product_attribute_value,
  )
  attribute_value: AttributeValueEntity;

  @ManyToOne(() => ProductEntity, (product) => product.product_attributes_value)
  product: ProductEntity;

  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @ManyToOne(
    () => ProviderEntity,
    (provider) => provider.product_attribute_value,
  )
  provider: ProviderEntity;

  @OneToMany(() => OrderEntity, (orders) => orders.price)
  orders: OrderEntity[];

  @DeleteDateColumn({ select: false })
  delete_at?: Date;
}
