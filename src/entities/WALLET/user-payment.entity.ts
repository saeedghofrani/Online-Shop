import { ColumnNumericTransformer } from 'src/common/classes/column-numeric-transformer.class';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { InstallmentEntity } from './installment.entity';

@Entity({ schema: 'wallet', name: 'user-payment' })
export class UserPaymentEntity extends MainEntity {


    @ManyToOne(() => InstallmentEntity, (installment) => installment.user_payments)
    installment: InstallmentEntity[];

    @Column()
    dou_date: Date;

    @Column('numeric', {
        transformer: new ColumnNumericTransformer(),
    })
    amount: number;
}
