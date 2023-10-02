import { ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'src/entities/wallet/enum/installment-type.enum';
import { PenaltyType } from 'src/entities/wallet/enum/penalty-type.enum';
import { PatternDetailEntity } from 'src/entities/wallet/pattern-detail.entity';

export class UpdatePatternDetailDto implements Partial<PatternDetailEntity> {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  period: string;

  @ApiProperty()
  priorety: number;
}
