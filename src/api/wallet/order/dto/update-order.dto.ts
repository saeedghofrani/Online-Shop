import { UserEntity } from '../../../../entities/AUTH/user.entity';
import { PricingEntity } from '../../../../entities/WALLET/pricing.entity';

export class UpdateOrderDto {
  user: UserEntity;

  price: PricingEntity;
}
