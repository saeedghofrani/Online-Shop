import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { ProductEntity } from '../PRODUCT/product.entity';
import { UserPaymentEntity } from './user-payment.entity';

@Entity({ schema: 'wallet', name: 'payment' })
export class PaymentEntity extends MainEntity {
    @Column()
    pre_payment: number;

    @Column()
    remain: number;

    @Column()
    month: number;

    @ManyToOne(() => ProductEntity, product => product.payments)
    product: ProductEntity;

    @OneToMany(() => UserPaymentEntity, (user_payments) => user_payments.payment)
    user_payments: UserPaymentEntity[];
}