import { ApiProperty } from '@nestjs/swagger';
import { SummaryEntity } from 'src/entities/INVENTORY/summary.entity';

export class UpdateSummaryDto implements Partial<SummaryEntity> {
  @ApiProperty()
  description: string;

  @ApiProperty()
  count: string;

  @ApiProperty()
  minimum: number;

  @ApiProperty()
  unit: string;
}
