import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/AUTH/user.entity';

export class CreateKycDto {
  @ApiProperty()
  father_name: string;

  @ApiProperty()
  national_code: string;

  @ApiProperty()
  birth_date: Date;

  @ApiHideProperty()
  user_id?: string;

  @ApiHideProperty()
  user?: UserEntity;
}
