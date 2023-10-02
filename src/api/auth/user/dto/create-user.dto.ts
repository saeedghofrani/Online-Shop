import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEntity } from 'src/entities/auth/role.entity';
import { UserEntity } from 'src/entities/auth/user.entity';

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
