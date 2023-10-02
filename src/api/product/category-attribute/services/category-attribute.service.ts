import { BadRequestException, Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { UpdateResult } from 'typeorm';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';
import { CategoryAttributeEntity } from 'entities/product/category-attribute.entity';
import { CategoryAttributeRepository } from '../repositories/category-attribute.repository';
import { CategoryService } from '../../category/services/catgeory.service';
import { AttributeService } from '../../attribute/services/attribute.service';

@Injectable()
export class CategoryAttributeService {
  constructor(
    private categoryAttributeRepository: CategoryAttributeRepository,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
  ) {}

  async createEntity(
    createEntityDto: CreateCategoryAttributeDto,
  ): Promise<CategoryAttributeEntity> {
    try {
      createEntityDto.attribute = await this.attributeService.findOneEntity(
        createEntityDto.attribute_id,
      );
      createEntityDto.category = await this.categoryService.findOneEntity(
        createEntityDto.category_id,
      );
      if (
        (await this.findPriceableAttribute(
          createEntityDto.category_id,
          createEntityDto.attribute_id,
        )) &&
        createEntityDto.priceable
      ) {
        throw new BadRequestException(
          'category can only contain one priceable attribute',
        );
      }
      return await this.categoryAttributeRepository.createEntity(
        createEntityDto,
      );
    } catch (e) {
      throw e;
    }
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateCategoryAttributeDto,
  ): Promise<UpdateResult> {
    try {
      updateEntityDto.attribute = await this.attributeService.findOneEntity(
        updateEntityDto.attribute_id,
      );
      updateEntityDto.category = await this.categoryService.findOneEntity(
        updateEntityDto.category_id,
      );
      if (
        (await this.findPriceableAttribute(
          updateEntityDto.category_id,
          updateEntityDto.attribute_id,
        )) &&
        updateEntityDto.priceable
      ) {
        throw new BadRequestException(
          'category can only contain one priceable attribute',
        );
      }
      await this.attributeService.updateEntity(updateEntityDto.attribute_id, {
        name: updateEntityDto.name,
        type: updateEntityDto.type,
      });
      delete updateEntityDto.name;
      delete updateEntityDto.type;
      delete updateEntityDto.category_id;
      delete updateEntityDto.attribute_id;
      return await this.categoryAttributeRepository.updateEntity(
        id,
        updateEntityDto,
      );
    } catch (e) {
      throw e;
    }
  }

  async findOneEntity(id: string): Promise<CategoryAttributeEntity> {
    try {
      return await this.categoryAttributeRepository.findOneEntity(id);
    } catch (e) {
      throw e;
    }
  }

  async findAllEntities(): Promise<CategoryAttributeEntity[]> {
    try {
      return await this.categoryAttributeRepository.findAllEntities();
    } catch (e) {
      throw e;
    }
  }

  async categoryAttributePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<CategoryAttributeEntity>> {
    try {
      return this.categoryAttributeRepository.categoryAttributePagination(
        query,
      );
    } catch (error) {
      throw error;
    }
  }

  async findPriceableAttribute(category_id: string, attribute_id: string) {
    try {
      return await this.categoryAttributeRepository.findPriceableAttribute(
        category_id,
        attribute_id,
      );
    } catch (error) {
      throw error;
    }
  }

  async removeCategoryAttribute(id: string) {
    return await this.categoryAttributeRepository.removeCategoryAttribute(id);
  }
}
