import { ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'entities/wallet/enum/installment-type.enum';
import { PenaltyType } from 'entities/wallet/enum/penalty-type.enum';
import { PatternMasterEntity } from 'entities/wallet/pattern-master.entity';

export class CreatePatternMasterDto implements Partial<PatternMasterEntity> {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  interest_rates: number;

  @ApiProperty()
  installmentType: installmentType;

  @ApiProperty()
  penaltyType: PenaltyType;

  @ApiProperty()
  penalty: number;
}
