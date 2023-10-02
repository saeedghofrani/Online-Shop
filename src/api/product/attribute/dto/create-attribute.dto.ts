import { ApiProperty } from '@nestjs/swagger';
import { AttributeEntity } from 'entities/product/attribute.entity';
import { AttributeEnum } from 'entities/product/enum/category-attribute-type.enum';

export class CreateAttributeDto implements Partial<AttributeEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: AttributeEnum;
}
