import { Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../AUTH/user.entity';
import { ProductAttributeValueEntity } from '../PRODUCT/product-attribute-value.entity';

@Entity({ schema: 'wallet', name: 'order' })
export class OrderEntity extends MainEntity {
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToOne(() => ProductAttributeValueEntity, (price) => price.orders)
  price: ProductAttributeValueEntity;
}
