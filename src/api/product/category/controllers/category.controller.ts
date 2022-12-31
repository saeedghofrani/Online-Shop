import GetApi from '@elastic/elasticsearch/lib/api/api/get';
import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';
import { UpdateResult } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryService } from '../services/catgeory.service';

@ApiBearerAuth('access-token')
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createEntity(
    @Body() createEntityDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createEntity(createEntityDto);
  }

  @Patch()
  async updateEntity(
    @Query('category_id') id: string,
    @Body() updateEntityDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryService.updateEntity(id, updateEntityDto);
  }

  @Get()
  async findOneEntity(
    @Query('category_id') id: string,
  ): Promise<CategoryEntity> {
    return await this.categoryService.findOneEntity(id);
  }

  @Get('all')
  async findAllEntities(): Promise<CategoryEntity[]> {
    return await this.categoryService.findAllEntities();
  }
}
