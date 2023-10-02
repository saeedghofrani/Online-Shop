import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { AttributeValueEntity } from 'entities/product/attribute-value.entity';
import { AttributeEntity } from 'entities/product/attribute.entity';

export class UpdateAttributeValueDto implements Partial<AttributeValueEntity> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  attribute_id: string;

  @ApiHideProperty()
  attribute: AttributeEntity;
}
