import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { InstallmentEntity } from 'entities/wallet/installment.entity';
import { PatternDetailEntity } from 'entities/wallet/pattern-detail.entity';
import { UserFactorEntity } from 'entities/wallet/user-factor.entity';

export class CreateInstallmentDto implements Partial<InstallmentEntity> {
  @ApiProperty()
  dou_date: Date;

  @ApiProperty()
  priec: number;

  @ApiProperty()
  time_period: string;

  @ApiHideProperty()
  pattern_detail: PatternDetailEntity;

  @ApiHideProperty()
  user_factor: UserFactorEntity;
}
