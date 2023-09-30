import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { BrandEntity } from 'src/entities/PRODUCT/brand.entity';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';
import { ProductEntity } from 'src/entities/product/product.entity';

export class UpdateProductDto   implements Partial<ProductEntity> {
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
