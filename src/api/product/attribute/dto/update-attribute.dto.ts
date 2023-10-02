import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { AttributeEntity } from 'entities/product/attribute.entity';
import { AttributeEnum } from 'entities/product/enum/category-attribute-type.enum';

export class UpdateAttributeDto implements Partial<AttributeEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: AttributeEnum;
}
