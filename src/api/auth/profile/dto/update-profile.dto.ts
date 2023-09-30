import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';

export class UpdateProfileDto implements Partial<ProfileEntity> {
  @ApiPropertyOptional()
  first_name: string;

  @ApiPropertyOptional()
  last_name: string;
}
