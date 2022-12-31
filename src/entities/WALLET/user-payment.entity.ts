import { ColumnNumericTransformer } from 'src/common/classes/column-numeric-transformer.class';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../AUTH/user.entity';
import { PaymentEntity } from './payment.entity';

@Entity({ schema: 'wallet', name: 'user-payment' })
export class UserPaymentEntity extends MainEntity {
  @ManyToOne(() => UserEntity, (user) => user.user_payments)
  user: UserEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.user_payments)
  payment: PaymentEntity;

  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column()
  do_date: Date;

  @Column()
  serial: string;
}
