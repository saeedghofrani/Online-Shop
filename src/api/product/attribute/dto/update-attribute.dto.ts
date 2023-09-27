import { ApiProperty } from '@nestjs/swagger';
import { AttributeEnum } from 'src/entities/PRODUCT/enum/category-attribute-type.enum';

export class UpdateAttributeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: AttributeEnum;
}
