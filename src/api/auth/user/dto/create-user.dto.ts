import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEntity } from 'src/entities/AUTH/role.entity';

export class CreateUserDto {
  @ApiPropertyOptional()
  mobile?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  prefix: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiHideProperty()
  roles: RoleEntity[];
}
