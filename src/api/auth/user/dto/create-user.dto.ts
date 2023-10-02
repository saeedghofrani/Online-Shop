import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEntity } from 'entities/auth/role.entity';
import { UserEntity } from 'entities/auth/user.entity';

export class CreateUserDto implements Partial<UserEntity> {
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
