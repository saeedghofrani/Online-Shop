import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { AttributeEnum } from 'src/entities/PRODUCT/enum/category-attribute-type.enum';

export class UpdateAttributeDto implements Partial<AttributeEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: AttributeEnum;
}
