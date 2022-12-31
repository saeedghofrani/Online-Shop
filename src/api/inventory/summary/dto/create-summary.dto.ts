import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';
import { ProductEntity } from 'src/entities/PRODUCT/product.entity';

export class CreateSummaryDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  count: string;

  @ApiProperty()
  minimum: number;

  @ApiProperty()
  unit: string;

  @ApiHideProperty()
  provider: ProviderEntity;

  @ApiHideProperty()
  product: ProductEntity;
}
