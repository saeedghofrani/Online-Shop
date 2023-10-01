import { Injectable } from '@nestjs/common';
import { PaginateQuery, Paginated, Paginate } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { BrandEntity } from 'src/entities/PRODUCT/brand.entity';
import { UpdateResult } from 'typeorm';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { BrandRepository } from '../repositories/brand.repository';

@Injectable()
export class BrandService {
  constructor(private brandRepository: BrandRepository) {}

  async createEntity(createEntityDto: CreateBrandDto): Promise<BrandEntity> {
    try {
      return await this.brandRepository.createEntity(createEntityDto);
    } catch (e) {
      throw e;
    }
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateBrandDto,
  ): Promise<UpdateResult> {
    try {
      return await this.brandRepository.updateEntity(id, updateEntityDto);
    } catch (e) {
      throw e;
    }
  }

  async findOneEntity(id: string): Promise<BrandEntity> {
    try {
      return await this.brandRepository.findOneEntity(id);
    } catch (e) {
      throw e;
    }
  }

  async findAllEntities(): Promise<BrandEntity[]> {
    try {
      return await this.brandRepository.findAllEntities();
    } catch (e) {
      throw e;
    }
  }

  async brandPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<BrandEntity>> {
    try {
      return this.brandRepository.brandPagination(query);
    } catch (e) {
      throw e;
    }
  }
}
