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
import * as argon2 from 'argon2';
import { ProfileEntity } from './profile.entity';
import { KycEntity } from './kyc.entity';
import { AddressEntity } from '../LOCATION/address.entity';
import { RoleEntity } from './role.entity';
import { FileEntity } from '../public/file.entity';
import { ProviderEntity } from '../INVENTORY/provider.entity';

@Entity({ schema: 'auth', name: 'user' })
export class UserEntity extends MainEntity {
  @Index({ fulltext: true })
  @Column({ nullable: true, unique: true })
  mobile: string;

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

  
  @OneToMany(() => ProviderEntity, (providers) => providers.user)
  providers: ProviderEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }

  @BeforeRecover()
  async removePassword() {
    delete this.password;
  }

  async verifyPassword(password): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}
