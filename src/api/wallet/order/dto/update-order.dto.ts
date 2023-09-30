import { OrderEntity } from 'src/entities/WALLET/order.entity';
import { UserEntity } from '../../../../entities/AUTH/user.entity';

export class UpdateOrderDto implements Partial<OrderEntity>{
  user: UserEntity;

  price: any;
}
