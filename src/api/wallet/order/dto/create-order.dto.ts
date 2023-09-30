import { UserEntity } from '../../../../entities/AUTH/user.entity';

export class CreateOrderDto {
  user: UserEntity;

  price: any;
}
