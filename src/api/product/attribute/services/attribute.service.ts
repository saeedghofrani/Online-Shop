import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { AttributeEntity } from 'src/entities/PRODUCT/attribute.entity';
import { UpdateResult } from 'typeorm';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { AttributeRepository } from '../repositories/attribute.repository';

@Injectable()
export class AttributeService {
  constructor(
    private attributeRepository: AttributeRepository
  ) {}

  async createEntity(
    createEntityDto: CreateAttributeDto,
  ): Promise<AttributeEntity> {
    try {
      return await this.attributeRepository.createEntity(createEntityDto);
    } catch (e) {
      throw e;
    }
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateAttributeDto,
  ): Promise<UpdateResult> {
    try {
      return await this.attributeRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<AttributeEntity> {
    try {
      return await this.attributeRepository.findOneEntity(id);
    } catch (e) {}
  }

  async findAllEntities(): Promise<AttributeEntity[]> {
    try {
      return await this.attributeRepository.findAllEntities();
    } catch (e) {}
  }

  async attributePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<AttributeEntity>> {
    return this.attributeRepository.attributePagination(query);
  }
}
