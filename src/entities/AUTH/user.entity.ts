import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserStatusEnum } from './enum/user-status.enum';
import * as argon2 from 'argon2';
import { ProfileEntity } from './profile.entity';
import { KycEntity } from './kyc.entity';

@Entity({ schema: 'AUTH', name: 'user' })
export class UserEntity extends MainEntity {
  @Column()
  mobile: string;

  @Column()
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

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }

  async verifyPassword(password): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}
