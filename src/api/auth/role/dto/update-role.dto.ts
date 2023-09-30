import { ApiHideProperty } from '@nestjs/swagger';
import { RoleEntity } from 'src/entities/AUTH/role.entity';

export class UpdateRoleDto implements Partial<RoleEntity> {
  @ApiHideProperty()
  name: string;

  @ApiHideProperty()
  default: boolean;
}
