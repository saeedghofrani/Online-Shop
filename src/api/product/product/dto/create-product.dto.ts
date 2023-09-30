import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BrandEntity } from 'src/entities/PRODUCT/brand.entity';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';
import { ProductEntity } from 'src/entities/product/product.entity';

export class CreateProductDto implements Partial<ProductEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  original_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiHideProperty()
  category: CategoryEntity;

  @ApiHideProperty()
  brand: BrandEntity;
}
