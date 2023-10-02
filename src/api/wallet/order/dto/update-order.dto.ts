import { OrderEntity } from 'src/entities/wallet/order.entity';
import { UserEntity } from '../../../../entities/auth/user.entity';

export class UpdateOrderDto implements Partial<OrderEntity> {
  user: UserEntity;

  price: any;
}
