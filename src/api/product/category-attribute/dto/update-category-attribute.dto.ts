import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsBoolean, IsString } from 'class-validator';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { CategoryAttributeEntity } from 'src/entities/PRODUCT/category-attribute.entity';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';
import { AttributeEnum } from 'src/entities/PRODUCT/enum/category-attribute-type.enum';

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
