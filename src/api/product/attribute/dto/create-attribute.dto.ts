import { ApiProperty } from '@nestjs/swagger';
import { AttributeEntity } from 'src/entities/product/attribute.entity';
import { AttributeEnum } from 'src/entities/product/enum/category-attribute-type.enum';

export class CreateAttributeDto implements Partial<AttributeEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: AttributeEnum;
}
