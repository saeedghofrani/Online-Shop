import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
@Controller('product_attribute_value')
export class ProductAttributeValueController {
  constructor(
    private ProductAttributeValueService: ProductAttributeValueService,
  ) {}

  @Post()
  createEntity(
    @Body() createEntityDto: CreateProductAttributeValueDto,
  ): Promise<ProductAttributeValueEntity> {
    return this.ProductAttributeValueService.createEntity(createEntityDto);
  }

  @Patch()
  updateEntity(
    @Query('id') id: string,
    @Body() updateEntityDto: UpdateProductAttributeValueDto,
  ): Promise<UpdateResult> {
    return this.ProductAttributeValueService.updateEntity(id, updateEntityDto);
  }

  @Get()
  findOneEntity(@Query('id') id: string): Promise<ProductAttributeValueEntity> {
    return this.ProductAttributeValueService.findOneEntity(id);
  }

  @Get('all')
  findAllEntities(): Promise<ProductAttributeValueEntity[]> {
    return this.ProductAttributeValueService.findAllEntities();
  }

  @Get('product')
  findByProduct(
    @Query('id') id: string,
  ): Promise<ProductAttributeValueEntity[]> {
    return this.ProductAttributeValueService.findByProduct(id);
  }

  @Delete()
  removeEntity(@Query('id') id: string) {
    return this.ProductAttributeValueService.removeEntity(id);
  }

  @Post('page')
  @ApiOperation({ summary: 'Product Attribute Value Pagination' })
  ProductAttributeValuePagination(
    @Body() query: PaginationQueryDto,
  ): Promise<Paginated<ProductAttributeValueEntity>> {
    return this.ProductAttributeValueService.ProductAttributeValeuPagination(
      query,
    );
  }
}
