import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from '../auth/user.entity';
import { ColumnNumericTransformer } from 'common/classes/column-numeric-transformer.class';

@Entity({ schema: 'wallet', name: 'wallet' })
export class WalletEntity extends MainEntity {
  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column('numeric', {
    transformer: new ColumnNumericTransformer(),
  })
  amount_block: number;

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  user: UserEntity;
}
