import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PermissionEntity } from 'entities/auth/permission.entity';
import { RoleEntity } from 'entities/auth/role.entity';

export class CreatePermissionDto implements Partial<PermissionEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  role_id: string[];

  @ApiHideProperty()
  roles: RoleEntity[];
}
