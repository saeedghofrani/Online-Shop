import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { CategoryAttributeEntity } from 'src/entities/PRODUCT/category-attribute.entity';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';

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
