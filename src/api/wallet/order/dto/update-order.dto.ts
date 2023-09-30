import { UserEntity } from '../../../../entities/AUTH/user.entity';

export class UpdateOrderDto {
  user: UserEntity;

  price: any;
}
