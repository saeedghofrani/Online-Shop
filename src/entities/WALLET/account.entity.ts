import { ColumnNumericTransformer } from 'src/common/classes/column-numeric-transformer.class';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../AUTH/user.entity';
import { PricingEntity } from './pricing.entity';

@Entity({ schema: 'wallet', name: 'account' })
export class AccountEntity extends MainEntity {
    @ManyToOne(() => UserEntity, user => user.accounts)
    user: UserEntity;

    @Column()
    account: string;

    @Column()
    iban: string;
}