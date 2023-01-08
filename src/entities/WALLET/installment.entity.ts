import { ColumnNumericTransformer } from 'src/common/classes/column-numeric-transformer.class';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { PatternDetailEntity } from './pattern-detail.entity';
import { UserFactorEntity } from './user-factor.entity';
import { UserPaymentEntity } from './user-payment.entity';

@Entity({ schema: 'wallet', name: 'installment' })
export class InstallmentEntity extends MainEntity {
    @Column()
    dou_date: Date;

  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  priec: number;

  @Column()
  time_period: string;

  @ManyToOne(() => PatternDetailEntity, (pattern_detail) => pattern_detail.installments)
  pattern_detail: PatternDetailEntity;
  
  @ManyToOne(() => UserFactorEntity, (user_factors) => user_factors.installments)
  user_factor: UserFactorEntity;

  @OneToMany(() => UserPaymentEntity, (user_payments) => user_payments.installment)
  user_payments: UserPaymentEntity[];
}
