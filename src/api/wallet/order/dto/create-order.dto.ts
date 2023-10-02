import { OrderEntity } from 'src/entities/wallet/order.entity';
import { UserEntity } from '../../../../entities/auth/user.entity';

export class CreateOrderDto implements Partial<OrderEntity> {
  user: UserEntity;

  price: any;
}
