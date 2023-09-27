import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { BrandEntity } from 'src/entities/PRODUCT/brand.entity';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';

export class UpdateProductDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  original_title: string;

  @ApiProperty()
  description: string;

  @ApiHideProperty()
  category: CategoryEntity;

  @ApiHideProperty()
  brand: BrandEntity;
}
