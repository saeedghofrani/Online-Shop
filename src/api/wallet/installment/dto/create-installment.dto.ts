import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { PatternDetailEntity } from 'src/entities/WALLET/pattern-detail.entity';
import { UserFactorEntity } from 'src/entities/WALLET/user-factor.entity';

export class CreateInstallmentDto {
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
