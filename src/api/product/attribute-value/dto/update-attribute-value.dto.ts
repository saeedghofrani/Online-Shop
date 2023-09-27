import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';

export class UpdateAttributeValueDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  attribute_id: string;

  @ApiHideProperty()
  attribute: AttributeEntity;
}