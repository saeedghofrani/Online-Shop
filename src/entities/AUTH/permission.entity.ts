import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { RoleEntity } from './role.entity';
import { RouteEntity } from './route.entity';

@Entity({ schema: 'auth', name: 'permission' })
export class PermissionEntity extends MainEntity {
  @Column()
  name: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];

  @ManyToMany(() => RouteEntity, (routes) => routes.permissions)
  @JoinTable({ name: 'permission_route' })
  routes: RouteEntity[];
}
