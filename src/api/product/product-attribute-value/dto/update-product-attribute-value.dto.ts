import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';
import { AttributeValueEntity } from 'src/entities/PRODUCT/attribute-value.entity';
import { ProductEntity } from 'src/entities/PRODUCT/product.entity';

export class UpdateProductAttributeValueDto {
  @ApiProperty()
  attribute_value_id: string;

  @ApiProperty()
  provider_id: string;

  @ApiProperty()
  product_id: string;

  @ApiProperty()
  price: number;

  @ApiHideProperty()
  attribute_value: AttributeValueEntity;

  @ApiHideProperty()
  provider: ProviderEntity;

  @ApiHideProperty()
  product: ProductEntity;
}
