import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { UpdateResult } from 'typeorm';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';
import { CategoryAttributeEntity } from 'src/entities/PRODUCT/category-attribute.entity';
import { CategoryAttributeRepository } from '../repositories/category-attribute.repository';

@Injectable()
export class CategoryAttributeService {
  constructor(
    private categoryAttributeRepository: CategoryAttributeRepository
    ) {}

  async createEntity(createEntityDto: CreateCategoryAttributeDto): Promise<CategoryAttributeEntity> {
    try {
      return await this.categoryAttributeRepository.createEntity(createEntityDto);
    } catch (e) {}
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateCategoryAttributeDto,
  ): Promise<UpdateResult> {
    try {
      return await this.categoryAttributeRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<CategoryAttributeEntity> {
    try {
      return await this.categoryAttributeRepository.findOneEntity(id);
    } catch (e) {}
  }

  async findAllEntities(): Promise<CategoryAttributeEntity[]> {
    try {
      return await this.categoryAttributeRepository.findAllEntities();
    } catch (e) {}
  }

  async categoryAttributePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<CategoryAttributeEntity>> {
    return this.categoryAttributeRepository.categoryAttributePagination(query);
  }
}
