import { Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../AUTH/user.entity';
import { PricingEntity } from './pricing.entity';

@Entity({ schema: 'wallet', name: 'order' })
export class OrderEntity extends MainEntity {
    @ManyToOne(() => UserEntity, user => user.orders)
    user: UserEntity;

    @ManyToOne(() => PricingEntity, price => price.orders)
    price: PricingEntity;
}