import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { AttributeValueEntity } from 'src/entities/PRODUCT/attribute-value.entity';
import { UpdateResult } from 'typeorm';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { AttributeValueRepository } from '../repositories/attribute-value.repository';
import { AttributeService } from '../../attribute/services/attribute.service';

@Injectable()
export class AttributeValueService {
  constructor(
    private attributeValueRepository: AttributeValueRepository,
    private attributeSevice: AttributeService,
  ) { }

  async createEntity(
    createEntityDto: CreateAttributeValueDto,
  ): Promise<AttributeValueEntity> {
    try {
      createEntityDto.attribute = await this.attributeSevice.findOneEntity(
        createEntityDto.attribute_id,
      );
      return await this.attributeValueRepository.createEntity(createEntityDto);
    } catch (e) {
      throw e
    }
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateAttributeValueDto,
  ): Promise<UpdateResult> {
    try {
      return await this.attributeValueRepository.updateEntity(
        id,
        updateEntityDto,
      );
    } catch (e) {
      throw e
    }
  }

  async findOneEntity(id: string): Promise<AttributeValueEntity> {
    try {
      return await this.attributeValueRepository.findOneEntity(id);
    } catch (e) {
      throw e
    }
  }

  async findAllEntities(): Promise<AttributeValueEntity[]> {
    try {
      return await this.attributeValueRepository.findAllEntities();
    } catch (e) {
      throw e
    }
  }

  async findByAttribute(id: string) {
    return await this.attributeValueRepository.findByAttribute(id)
  }

  async removeAttributeValue(id: string) {
    return await this.attributeValueRepository.removeAttributeValue(id);
  }

  async productAttributeValue(id: number) {
    return await this.attributeValueRepository.productAttributeValue(id)
  }

  async attributeValuePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<AttributeValueEntity>> {
    try {
      return this.attributeValueRepository.attributeValuePagination(query);
    } catch (e) {
      throw e
    }
  }
}
