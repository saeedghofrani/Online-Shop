import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from 'src/entities/auth/role.entity';

export class CreateRoleDto implements Partial<RoleEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  default: boolean;
}
