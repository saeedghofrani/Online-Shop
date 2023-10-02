import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { AttributeEntity } from 'entities/product/attribute.entity';
import { CategoryAttributeEntity } from 'entities/product/category-attribute.entity';
import { CategoryEntity } from 'entities/product/category.entity';

export class CreateCategoryAttributeDto
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
