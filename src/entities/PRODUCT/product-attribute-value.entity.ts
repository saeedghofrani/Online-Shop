import { DeleteDateColumn, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { AttributeValueEntity } from './attribute-value.entity';
import { ProductEntity } from './product.entity';
import { ProviderEntity } from '../INVENTORY/provider.entity';

@Entity({ schema: 'product', name: 'product_attribute_value' })
export class ProductAttributeValueEntity extends MainEntity {
  @ManyToOne(
    () => AttributeValueEntity,
    (attribute_value) => attribute_value.product_attribute_value,
  )
  attribute_value: AttributeValueEntity;

  @ManyToOne(() => ProductEntity, (product) => product.product_attributes_value)
  product: ProductEntity;

  @ManyToOne(
    () => ProviderEntity,
    (provider) => provider.product_attribute_value,
  )
  provider: ProviderEntity;

  @DeleteDateColumn({})
  delete_at?: Date;
}
