import { Column, Entity, OneToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from './user.entity';

@Entity({ schema: 'AUTH', name: 'kyc' })
export class KycEntity extends MainEntity {
  @Column()
  father_name: string;

  @Column({ unique: true })
  national_code: string;

  @Column()
  birth_date: Date;

  @OneToOne(() => UserEntity)
  user: UserEntity;
}
