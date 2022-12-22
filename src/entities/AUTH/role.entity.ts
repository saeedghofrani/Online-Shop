import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { PermissionEntity } from './permission.entity';

@Entity({ schema: 'AUTH', name: 'role' })
export class RoleEntity extends MainEntity {
  @Column()
  name: string;

  @DeleteDateColumn({})
  delete_at?: Date;

  @ManyToMany(() => PermissionEntity)
  @JoinTable({ name: 'role_permissions' })
  permissions: PermissionEntity[];
}
