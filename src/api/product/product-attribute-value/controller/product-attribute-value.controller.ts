import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductAttributeValueEntity } from 'src/entities/PRODUCT/product-attribute-value.entity';
import { UpdateResult } from 'typeorm';
import { CreateProductAttributeValueDto } from '../dto/create-product-attribute-value.dto';
import { UpdateProductAttributeValueDto } from '../dto/update-product-attribute-value.dto';
import { ProductAttributeValueService } from '../services/product-attribute-value.service';

@ApiBearerAuth('access-token')
@ApiTags('ProductAttributeValue')
@Controller('category_product_attribute')
export class ProductAttributeValueController {
  constructor(private categoryProductAttributeService: ProductAttributeValueService) { }

  @Post()
  createEntity(@Body() createEntityDto: CreateProductAttributeValueDto): Promise<ProductAttributeValueEntity> {
    return this.categoryProductAttributeService.createEntity(createEntityDto);
  }

  @Patch()
  updateEntity(
    @Query('product_attribute_value_id') id: string,
    @Body() updateEntityDto: UpdateProductAttributeValueDto,
  ): Promise<UpdateResult> {
    return this.categoryProductAttributeService.updateEntity(id, updateEntityDto);
  }

  @Get()
  findOneEntity(@Query('product_attribute_value_id') id: string): Promise<ProductAttributeValueEntity> {
    return this.categoryProductAttributeService.findOneEntity(id);
  }

  @Get('all')
  findAllEntities(): Promise<ProductAttributeValueEntity[]> {
    return this.categoryProductAttributeService.findAllEntities();
  }

  @Post('page')
  @ApiOperation({ summary: 'Product Attribute Value Pagination' })
  categoryProductAttributePagination(
    @Body() query: PaginationQueryDto,
  ): Promise<Paginated<ProductAttributeValueEntity>> {
    return this.categoryProductAttributeService.categoryProductAttributePagination(query);
  }
}