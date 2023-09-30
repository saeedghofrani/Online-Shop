import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/AUTH/user.entity';

export class UpdateUserDto implements Partial<UserEntity> {
  @ApiPropertyOptional()
  mobile?: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  password: string;
}
