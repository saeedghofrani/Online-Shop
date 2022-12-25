import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { RoleEntity } from 'src/entities/AUTH/role.entity';

export class CreatePermissionDto {
  @ApiPropertyOptional()
  name: string;

  @ApiHideProperty()
  role_id?: string[];

  @ApiHideProperty()
  roles: RoleEntity[];
}
