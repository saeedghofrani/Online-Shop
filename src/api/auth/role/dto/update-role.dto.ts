import { ApiHideProperty } from '@nestjs/swagger';
import { RoleEntity } from 'entities/auth/role.entity';

export class UpdateRoleDto implements Partial<RoleEntity> {
  @ApiHideProperty()
  name: string;

  @ApiHideProperty()
  default: boolean;
}
