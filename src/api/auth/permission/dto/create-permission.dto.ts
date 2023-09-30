import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PermissionEntity } from 'src/entities/AUTH/permission.entity';
import { RoleEntity } from 'src/entities/AUTH/role.entity';

export class CreatePermissionDto implements Partial<PermissionEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  role_id: string[];

  @ApiHideProperty()
  roles: RoleEntity[];
}
