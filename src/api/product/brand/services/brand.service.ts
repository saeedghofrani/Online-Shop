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
    } catch (e) {}
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdateBrandDto,
  ): Promise<UpdateResult> {
    try {
      return await this.brandRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<BrandEntity> {
    try {
      return await this.brandRepository.findOneEntity(id);
    } catch (e) {}
  }

  async findAllEntities(): Promise<BrandEntity[]> {
    try {
      return await this.brandRepository.findAllEntities();
    } catch (e) {}
  }

  async brandPagination(query:PaginationQueryDto):Promise<Paginated<BrandEntity>>
  {
    return this.brandRepository.brandPagination(query)
  }
}
