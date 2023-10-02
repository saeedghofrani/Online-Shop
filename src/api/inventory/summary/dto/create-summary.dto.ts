import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProviderEntity } from 'entities/inventory/provider.entity';
import { SummaryEntity } from 'entities/inventory/summary.entity';
import { ProductEntity } from 'entities/product/product.entity';

export class CreateSummaryDto implements Partial<SummaryEntity> {
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

  @ApiHideProperty()
  provider: ProviderEntity;

  @ApiHideProperty()
  product: ProductEntity;
}
