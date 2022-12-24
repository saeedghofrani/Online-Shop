import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';

@Entity({ schema: 'AUTH', name: 'role' })
export class RoleEntity extends MainEntity {
  @Column()
  name: string;

  @Column()
  default: boolean;

  @DeleteDateColumn({})
  delete_at?: Date;

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.roles)
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity, (users) => users.roles)
  users: UserEntity[];
}
