import { ApiProperty } from '@nestjs/swagger';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { AttributeEnum } from 'src/entities/PRODUCT/enum/category-attribute-type.enum';

export class CreateAttributeDto implements Partial<AttributeEntity> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: AttributeEnum;
}
