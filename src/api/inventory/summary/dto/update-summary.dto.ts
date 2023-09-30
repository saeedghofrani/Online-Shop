import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SummaryEntity } from 'src/entities/INVENTORY/summary.entity';

export class UpdateSummaryDto implements Partial<SummaryEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  count: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  minimum: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  unit: string;
}
