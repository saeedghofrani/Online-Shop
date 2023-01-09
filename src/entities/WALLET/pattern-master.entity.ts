import { ColumnNumericTransformer } from 'src/common/classes/column-numeric-transformer.class';
import { Column, Entity, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { installmentType } from './enum/installment-type.enum';
import { PenaltyType } from './enum/penalty-type.enum';
import { PatternDetailEntity } from './pattern-detail.entity';
import { UserFactorEntity } from './user-factor.entity';

@Entity({ schema: 'wallet', name: 'pattern-master' })
export class PatternMasterEntity extends MainEntity {
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  interest_rates: number;

  @Column({ type: 'enum', enum: installmentType })
  installmentType: installmentType;

  @Column({ type: 'enum', enum: PenaltyType })
  penaltyType: PenaltyType;

  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  penalty: number;

  @OneToMany(
    () => PatternDetailEntity,
    (pattern_details) => pattern_details.pattern_master,
  )
  pattern_details: PatternDetailEntity[];

  @OneToMany(
    () => UserFactorEntity,
    (user_factors) => user_factors.pattern_master,
  )
  user_factors: UserFactorEntity[];
}
