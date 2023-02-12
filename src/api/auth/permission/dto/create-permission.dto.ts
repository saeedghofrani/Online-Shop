import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { RoleEntity } from 'src/entities/AUTH/role.entity';

export class CreatePermissionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  role_id: string[];

  @ApiHideProperty()
  roles: RoleEntity[];
}
