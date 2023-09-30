import { ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'src/entities/WALLET/enum/installment-type.enum';
import { PenaltyType } from 'src/entities/WALLET/enum/penalty-type.enum';
import { PatternDetailEntity } from 'src/entities/WALLET/pattern-detail.entity';

export class UpdatePatternDetailDto implements Partial<PatternDetailEntity> {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  period: string;

  @ApiProperty()
  priorety: number;
}
