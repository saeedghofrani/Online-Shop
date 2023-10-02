import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'entities/wallet/enum/installment-type.enum';
import { PenaltyType } from 'entities/wallet/enum/penalty-type.enum';
import { PatternDetailEntity } from 'entities/wallet/pattern-detail.entity';
import { PatternMasterEntity } from 'entities/wallet/pattern-master.entity';

export class CreatePatternDetailDto implements Partial<PatternDetailEntity> {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  period: string;

  @ApiProperty()
  priorety: number;

  @ApiHideProperty()
  pattern_master: PatternMasterEntity;
}
