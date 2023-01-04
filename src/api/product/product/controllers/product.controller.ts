import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from 'src/entities/PRODUCT/product.entity';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from '../services/product.service';

@ApiBearerAuth('access-token')
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createEntity(
    @Query('category_id') categoryId: string,
    @Query('brand_id') brandId: string,
    @Body() createEntityDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createEntity(
      categoryId,
      brandId,
      createEntityDto,
    );
  }

  @Patch()
  updateEntity(
    @Query('product_id') id: string,
    updateEntityDto: UpdateProductDto,
    @Query('category_id') categoryId: string,
    @Query('brand_id') brandId: string,
  ): Promise<UpdateResult> {
    return this.productService.updateEntity(
      id,
      updateEntityDto,
      categoryId,
      brandId,
    );
  }

  @Get()
  findOneEntity(@Query('product_id') id: string): Promise<ProductEntity> {
    return this.productService.findOneEntity(id);
  }

  @Get('all')
  findAllEntities(): Promise<ProductEntity[]> {
    return this.productService.findAllEntities();
  }
}
