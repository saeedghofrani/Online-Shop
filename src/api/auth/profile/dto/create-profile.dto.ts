import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/AUTH/user.entity';

export class CreateProfileDto {
  @ApiPropertyOptional()
  first_name: string;

  @ApiPropertyOptional()
  last_name: string;

  @ApiHideProperty()
  user_id?: string;

  @ApiHideProperty()
  user?: UserEntity;
}
