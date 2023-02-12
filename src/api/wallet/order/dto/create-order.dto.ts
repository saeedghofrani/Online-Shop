import { ManyToOne } from 'typeorm';
import { UserEntity } from '../../../../entities/AUTH/user.entity';
import { PricingEntity } from '../../../../entities/WALLET/pricing.entity';

export class CreateOrderDto {
  user: UserEntity;

  price: PricingEntity;
}
