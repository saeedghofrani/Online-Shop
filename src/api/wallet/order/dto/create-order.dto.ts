import { OrderEntity } from 'entities/wallet/order.entity';
import { UserEntity } from '../../../../entities/auth/user.entity';

export class CreateOrderDto implements Partial<OrderEntity> {
  user: UserEntity;

  price: any;
}
