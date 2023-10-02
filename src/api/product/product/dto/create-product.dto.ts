import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BrandEntity } from 'entities/product/brand.entity';
import { CategoryEntity } from 'entities/product/category.entity';
import { ProductEntity } from 'entities/product/product.entity';

export class CreateProductDto implements Partial<ProductEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  original_title: string;

  @ApiProperty()
  description: string;

  @ApiHideProperty()
  category: CategoryEntity;

  @ApiHideProperty()
  brand: BrandEntity;
}
