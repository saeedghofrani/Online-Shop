import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsBoolean, IsString } from 'class-validator';
import { AttributeEntity } from 'entities/product/attribute.entity';
import { CategoryAttributeEntity } from 'entities/product/category-attribute.entity';
import { CategoryEntity } from 'entities/product/category.entity';
import { AttributeEnum } from 'entities/product/enum/category-attribute-type.enum';

export class UpdateCategoryAttributeDto
  implements Partial<CategoryAttributeEntity>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  filterable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  priceable: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: AttributeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  attribute_id: string;

  @ApiHideProperty()
  category: CategoryEntity;

  @ApiHideProperty()
  attribute: AttributeEntity;
}
