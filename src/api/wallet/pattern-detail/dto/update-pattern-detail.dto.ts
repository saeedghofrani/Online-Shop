import { ApiProperty } from '@nestjs/swagger';
import { installmentType } from 'src/entities/WALLET/enum/installment-type.enum';
import { PenaltyType } from 'src/entities/WALLET/enum/penalty-type.enum';

export class UpdatePatternDetailDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  period: string;

  @ApiProperty()
  priorety: number;
}
