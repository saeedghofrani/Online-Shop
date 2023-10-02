import {
  BeforeInsert,
  BeforeRecover,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserStatusEnum } from './enum/user-status.enum';
import crypto from 'crypto';
import { ProfileEntity } from './profile.entity';
import { KycEntity } from './kyc.entity';
import { AddressEntity } from '../location/address.entity';
import { RoleEntity } from './role.entity';
import { FileEntity } from '../public/file.entity';
import { ProviderEntity } from '../inventory/provider.entity';
import { WalletEntity } from '../wallet/wallet.entity';
import { OrderEntity } from '../wallet/order.entity';
import { AccountEntity } from '../wallet/account.entity';

@Entity({ schema: 'auth', name: 'user' })
export class UserEntity extends MainEntity {
  @Index({ fulltext: true })
  @Column({ nullable: true, unique: true })
  mobile: string;

  @Column({ nullable: true, unique: false })
  prefix: string;

  @Index({ fulltext: true })
  @Column({ nullable: true, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE,
  })
  status: UserStatusEnum;

  @Column({ nullable: true, select: false })
  password: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToOne(() => KycEntity)
  @JoinColumn()
  kyc: KycEntity;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @ManyToMany(() => RoleEntity, (roles) => roles.users)
  @JoinTable({ name: 'user_role' })
  roles: RoleEntity[];

  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[];

  @OneToMany(() => WalletEntity, (wallets) => wallets.user)
  wallets: WalletEntity[];

  @OneToMany(() => OrderEntity, (orders) => orders.user)
  orders: OrderEntity[];

  @OneToMany(() => ProviderEntity, (providers) => providers.user)
  providers: ProviderEntity[];

  @OneToMany(() => AccountEntity, (accounts) => accounts.user)
  accounts: AccountEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
      const hash = crypto
        .pbkdf2Sync(this.password, salt, 1000, 64, 'sha512')
        .toString('hex'); // Use a suitable hashing algorithm
      this.password = `${salt}:${hash}`;
    }
  }

  @BeforeRecover()
  async removePassword() {
    delete this.password;
  }

  async verifyPassword(password: string, entityPassword: string): Promise<boolean> {
    const [storedSalt, storedHash] = entityPassword.split(':');
    const hash = crypto
      .pbkdf2Sync(password, storedSalt, 1000, 64, 'sha512')
      .toString('hex');
    
    return hash === storedHash;
  }
}
