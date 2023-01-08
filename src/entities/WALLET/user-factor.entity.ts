import { ColumnNumericTransformer } from 'src/common/classes/column-numeric-transformer.class';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { installmentType } from './enum/installment-type.enum';
import { PenaltyType } from './enum/penalty-type.enum';
import { InstallmentEntity } from './installment.entity';
import { PatternMasterEntity } from './pattern-master.entity';

@Entity({ schema: 'wallet', name: 'user-factor' })
export class UserFactorEntity extends MainEntity {

    @Column()
    purchase_date: Date

    @Column('numeric', {
        transformer: new ColumnNumericTransformer(),
    })
    amount: number;

    @Column()
    installment_count: number;

    @Column({type: 'enum', enum: PenaltyType})
    penaltyType: PenaltyType;

    @Column('numeric', {
        transformer: new ColumnNumericTransformer(),
    })
    total_amount: number;

    @Column('numeric', {
        transformer: new ColumnNumericTransformer(),
    })
    product_price: number;

    @Column({type: 'enum', enum: installmentType})
    installmentType: installmentType;
    
    @ManyToOne(() => PatternMasterEntity, (pattern_master) => pattern_master.user_factors)
    pattern_master: PatternMasterEntity;

    @OneToMany(() => InstallmentEntity, (installments) => installments.user_factor)
    installments: InstallmentEntity[];
}
