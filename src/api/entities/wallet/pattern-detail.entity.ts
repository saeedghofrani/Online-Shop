import { ColumnNumericTransformer } from 'common/classes/column-numeric-transformer.class';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { InstallmentEntity } from './installment.entity';
import { PatternMasterEntity } from './pattern-master.entity';

@Entity({ schema: 'wallet', name: 'pattern-detail' })
export class PatternDetailEntity extends MainEntity {
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column()
  period: string;

  @Column()
  priorety: number;

  @ManyToOne(
    () => PatternMasterEntity,
    (pattern_master) => pattern_master.pattern_details,
  )
  pattern_master: PatternMasterEntity;

  @OneToMany(
    () => InstallmentEntity,
    (installments) => installments.pattern_detail,
  )
  installments: InstallmentEntity[];
}
