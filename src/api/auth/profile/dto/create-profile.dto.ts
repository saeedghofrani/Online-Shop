import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';
import { UserEntity } from 'src/entities/AUTH/user.entity';

export class CreateProfileDto implements Partial<ProfileEntity> {
  @ApiPropertyOptional()
  first_name: string;

  @ApiPropertyOptional()
  last_name: string;

  @ApiHideProperty()
  user_id?: string;

  @ApiHideProperty()
  user?: UserEntity;
}
