import { Column, Entity, OneToOne } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { UserEntity } from './user.entity';

@Entity({ schema: 'AUTH', name: 'profile' })
export class ProfileEntity extends MainEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;
}
