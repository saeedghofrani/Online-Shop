import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CategoryEntity } from 'src/entities/PRODUCT/category.entity';
import { UpdateResult } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createEntity(
    createEntityDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    if (createEntityDto.parent_id) {
      const findParent = await this.categoryRepository.findOneEntity(
        createEntityDto.parent_id,
      );
      createEntityDto.parent = findParent;
    }
    return await this.categoryRepository.createEntity(createEntityDto);
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    if (updateEntityDto.parent_id) {
      const findParent = await this.categoryRepository.findOneEntity(
        updateEntityDto.parent_id,
      );
      updateEntityDto.parent = findParent;
    }
    return await this.categoryRepository.updateEntity(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<CategoryEntity> {
    return await this.categoryRepository.findOneEntity(id);
  }
  async findAllEntities(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findAllEntities();
  }
  async findTree(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findTree();
  }

  async categoryPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<CategoryEntity>> {
    return this.categoryRepository.categoryPagination(query);
  }

  async findRoots() {
    return await this.categoryRepository.findRoots()
  }

  async findChildren(parent_id: number) {
    return await this.categoryRepository.findChildren(parent_id);
  }

  async removeCategory(id: number) {
    return await this.categoryRepository.removeCategory(id);
  }
}
