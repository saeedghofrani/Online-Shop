import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CategoryAttributeEntity } from 'src/entities/PRODUCT/category-attribute.entity';
import { UpdateResult } from 'typeorm';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';
import { CategoryAttributeService } from '../services/category-attribute.service';

@ApiBearerAuth('access-token')
@ApiTags('CategoryAttribute')
@Controller('category_attribute')
export class CategoryAttributeController {
  constructor(private categoryAttributeService: CategoryAttributeService) { }

  @Post()
  createEntity(@Body() createEntityDto: CreateCategoryAttributeDto): Promise<CategoryAttributeEntity> {
    return this.categoryAttributeService.createEntity(createEntityDto);
  }

  @Patch()
  updateEntity(
    @Query('category-attribute_id') id: string,
    @Body() updateEntityDto: UpdateCategoryAttributeDto,
  ): Promise<UpdateResult> {
    return this.categoryAttributeService.updateEntity(id, updateEntityDto);
  }

  @Get()
  findOneEntity(@Query('category-attribute_id') id: string): Promise<CategoryAttributeEntity> {
    return this.categoryAttributeService.findOneEntity(id);
  }

  @Get('all')
  findAllEntities(): Promise<CategoryAttributeEntity[]> {
    return this.categoryAttributeService.findAllEntities();
  }

  @Post('page')
  @ApiOperation({ summary: 'CategoryAttribute Pagination' })
  categoryAttributePagination(
    @Body() query: PaginationQueryDto,
  ): Promise<Paginated<CategoryAttributeEntity>> {
    return this.categoryAttributeService.categoryAttributePagination(query);
  }
}
