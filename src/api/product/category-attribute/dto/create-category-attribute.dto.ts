import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';

export class CreateCategoryAttributeDto {
  @ApiProperty()
  filterable: boolean;

  @ApiProperty()
  priceable: boolean;

  @ApiProperty()
  category_id: string;

  @ApiProperty()
  attribute_id: string;

  @ApiHideProperty()
  category: CategoryEntity;

  @ApiHideProperty()
  attribute: AttributeEntity;
}
