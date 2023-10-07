import { Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../auth/user.entity';

@Entity({ schema: 'wallet', name: 'order' })
export class OrderEntity extends MainEntity {
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
}
