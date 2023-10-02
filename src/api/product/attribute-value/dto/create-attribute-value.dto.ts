import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AttributeValueEntity } from 'src/entities/product/attribute-value.entity';
import { AttributeEntity } from 'src/entities/product/attribute.entity';

export class CreateAttributeValueDto implements Partial<AttributeValueEntity> {
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
