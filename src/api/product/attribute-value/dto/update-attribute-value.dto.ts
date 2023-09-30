import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AttributeValueEntity } from 'src/entities/PRODUCT/attribute-value.entity';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';

export class UpdateAttributeValueDto implements Partial<AttributeValueEntity> {
  @ApiProperty()
  value: string;

  @ApiProperty()
  attribute_id: string;

  @ApiHideProperty()
  attribute: AttributeEntity;
}
