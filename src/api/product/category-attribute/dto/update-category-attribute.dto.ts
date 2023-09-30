import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsBoolean, IsString } from 'class-validator';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { CategoryAttributeEntity } from 'src/entities/PRODUCT/category-attribute.entity';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';

export class UpdateCategoryAttributeDto   implements Partial<CategoryAttributeEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1)
  @IsBoolean()
  filterable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1)
  @IsBoolean()
  priceable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1)
  @IsString()
  category_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1)
  @IsString()
  attribute_id: string;

  @ApiHideProperty()
  category: CategoryEntity;

  @ApiHideProperty()
  attribute: AttributeEntity;
}
