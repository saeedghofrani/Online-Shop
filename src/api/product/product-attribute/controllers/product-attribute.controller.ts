import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { ProductAttributeEntity } from 'src/entities/PRODUCT/product-attribute.entity';
import { UpdateResult } from 'typeorm';
import { CreateProductAttribute } from '../dto/create-product-attribute.dto';
import { UpdateProductAttribute } from '../dto/update-product-attribute.dto';
import { ProductAttributeService } from '../services/product-attribute.service';

@ApiBearerAuth('access-token')
@ApiTags('Product-Attribute')
@Controller('product-attribute')
export class ProductAttributeController {
  constructor(private productAttributeService: ProductAttributeService) {}

  @Post()
  async createEntity(
    createEntityDto: CreateProductAttribute,
  ): Promise<ProductAttributeEntity> {
    return await this.productAttributeService.createEntity(createEntityDto);
  }

  @Patch()
  async updateEntity(
    id: string,
    updateEntityDto: UpdateProductAttribute,
  ): Promise<UpdateResult> {
    return await this.productAttributeService.updateEntity(id, updateEntityDto);
  }

  @Get()
  async findOneEntity(id: string): Promise<ProductAttributeEntity> {
    return await this.productAttributeService.findOneEntity(id);
  }

  @Get('all')
   findAllEntities(): Promise<ProductAttributeEntity[]> {
    return  this.productAttributeService.findAllEntities();
  }

  @Post("page")
  @ApiOperation({ summary: 'Product Attribute Pagination' })
   productAttributePagination(@Body() query:PaginationQueryDto):Promise<Paginated<ProductAttributeEntity>>
  {
    return this.productAttributeService.productAttributePagination(query)
  }
}
