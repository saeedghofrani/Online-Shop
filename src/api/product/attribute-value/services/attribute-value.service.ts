import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { AttributeValueEntity } from 'src/entities/PRODUCT/attribute-value.entity';
import { UpdateResult } from 'typeorm';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { AttributeValueRepository } from '../repositories/attribute-value.repository';

@Injectable()
export class AttributeValueService {
  constructor(private attributeValueRepository: AttributeValueRepository) {}

  async createEntity(createEntityDto: CreateAttributeValueDto): Promise<AttributeValueEntity> {
    try {
      return await this.attributeValueRepository.createEntity(createEntityDto);
    } catch (e) {}
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateAttributeValueDto,
  ): Promise<UpdateResult> {
    try {
      return await this.attributeValueRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<AttributeValueEntity> {
    try {
      return await this.attributeValueRepository.findOneEntity(id);
    } catch (e) {}
  }

  async findAllEntities(): Promise<AttributeValueEntity[]> {
    try {
      return await this.attributeValueRepository.findAllEntities();
    } catch (e) {}
  }

  async attributeValuePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<AttributeValueEntity>> {
    return this.attributeValueRepository.attributeValuePagination(query);
  }
}
