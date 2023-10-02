import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { KycEntity } from 'entities/auth/kyc.entity';
import { UserEntity } from 'entities/auth/user.entity';

export class CreateKycDto implements Partial<KycEntity> {
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
