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
import { CategoryAttributeEntity } from 'src/entities/product/category-attribute.entity';
import { UpdateResult } from 'typeorm';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';
import { CategoryAttributeService } from '../services/category-attribute.service';

@ApiBearerAuth('access-token')
@ApiTags('CategoryAttribute')
@Controller('category_attribute')
export class CategoryAttributeController {
  constructor(private categoryAttributeService: CategoryAttributeService) {}

  @Post()
  createEntity(
    @Body() createEntityDto: CreateCategoryAttributeDto,
  ): Promise<CategoryAttributeEntity> {
    return this.categoryAttributeService.createEntity(createEntityDto);
  }

  @Patch()
  updateEntity(
    @Query('id') id: string,
    @Body() updateEntityDto: UpdateCategoryAttributeDto,
  ): Promise<UpdateResult> {
    return this.categoryAttributeService.updateEntity(id, updateEntityDto);
  }

  @Get()
  findOneEntity(@Query('id') id: string): Promise<CategoryAttributeEntity> {
    return this.categoryAttributeService.findOneEntity(id);
  }

  @Get('all')
  findAllEntities(): Promise<CategoryAttributeEntity[]> {
    return this.categoryAttributeService.findAllEntities();
  }

  @Delete()
  async removeCategoryAttribute(
    @Query('id') id: string,
  ): Promise<CategoryAttributeEntity> {
    return await this.categoryAttributeService.removeCategoryAttribute(id);
  }

  @Post('page')
  @ApiOperation({ summary: 'CategoryAttribute Pagination' })
  categoryAttributePagination(
    @Body() query: PaginationQueryDto,
  ): Promise<Paginated<CategoryAttributeEntity>> {
    return this.categoryAttributeService.categoryAttributePagination(query);
  }
}
