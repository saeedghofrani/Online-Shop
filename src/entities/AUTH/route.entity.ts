import { Column, Entity, ManyToMany } from 'typeorm';
import { MainEntity } from '../../common/entities/main.entity';
import { RouteMethodeEnum } from './enum/route-method.enum';
import { PermissionEntity } from './permission.entity';

@Entity({ schema: 'auth', name: 'route' })
export class RouteEntity extends MainEntity {
  @Column({ unique: true })
  address: string;

  @Column({ type: 'jsonb', nullable: true })
  query: Record<string, string>;

  @Column({ type: 'enum', enum: RouteMethodeEnum })
  method: RouteMethodeEnum;

  @Column()
  summary: string;

  @Column()
  jwt: boolean;

  @Column({ type: 'jsonb', nullable: true })
  body: Record<string, string>;

  @Column()
  status: boolean;

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.routes)
  permissions: PermissionEntity[];
}
