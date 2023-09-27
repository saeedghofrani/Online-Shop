import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProviderEntity } from 'src/entities/INVENTORY/provider.entity';
import { AttributeValueEntity } from 'src/entities/PRODUCT/attribute-value.entity';

export class UpdateProductAttributeValueDto {
  @ApiProperty()
  attribute_value_id: string;

  @ApiProperty()
  provider_id: string;

  @ApiHideProperty()
  attribute_value: AttributeValueEntity;

  @ApiHideProperty()
  provider: ProviderEntity;
}