import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from 'entities/auth/user.entity';

export class UpdateUserDto implements Partial<UserEntity> {
  @ApiPropertyOptional()
  mobile?: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  password: string;
}
