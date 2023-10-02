import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { CategoryEntity } from 'entities/product/category.entity';
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
    try {
      if (createEntityDto.parent_id) {
        const findParent = await this.categoryRepository.findOneEntity(
          createEntityDto.parent_id,
        );
        createEntityDto.parent = findParent;
      }
      return await this.categoryRepository.createEntity(createEntityDto);
    } catch (error) {
      throw error;
    }
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    try {
      if (updateEntityDto.parent_id) {
        const findParent = await this.categoryRepository.findOneEntity(
          updateEntityDto.parent_id,
        );
        updateEntityDto.parent = findParent;
      }
      return await this.categoryRepository.updateEntity(id, updateEntityDto);
    } catch (error) {
      throw error;
    }
  }
  async findOneEntity(id: string): Promise<CategoryEntity> {
    try {
      return await this.categoryRepository.findOneEntity(id);
    } catch (error) {
      throw error;
    }
  }
  async findAllEntities(): Promise<CategoryEntity[]> {
    try {
      return await this.categoryRepository.findAllEntities();
    } catch (error) {
      throw error;
    }
  }
  async findTree(): Promise<CategoryEntity[]> {
    try {
      return await this.categoryRepository.findTree();
    } catch (error) {
      throw error;
    }
  }

  async categoryPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<CategoryEntity>> {
    try {
      return this.categoryRepository.categoryPagination(query);
    } catch (error) {
      throw error;
    }
  }

  async findRoots() {
    try {
      return await this.categoryRepository.findRoots();
    } catch (error) {
      throw error;
    }
  }

  async findChildren(parent_id: number) {
    try {
      return await this.categoryRepository.findChildren(parent_id);
    } catch (error) {
      throw error;
    }
  }

  async removeCategory(id: number) {
    try {
      return await this.categoryRepository.removeCategory(id);
    } catch (error) {
      throw error;
    }
  }
}
