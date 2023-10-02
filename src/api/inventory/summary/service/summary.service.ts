import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { SummaryEntity } from 'src/entities/inventory/summary.entity';
import { UpdateResult } from 'typeorm';
import { ProviderService } from '../../provider/service/provider.service';
import { CreateSummaryDto } from '../dto/create-summary.dto';
import { UpdateSummaryDto } from '../dto/update-summary.dto';
import { SummaryRepository } from '../repository/summary.repository';

@Injectable()
export class SummaryService {
  constructor(
    private summaryRepository: SummaryRepository,
    private providerService: ProviderService,
  ) {}

  async createEntity(
    createEntityDto: CreateSummaryDto,
    productId: string,
    providerId: string,
  ): Promise<SummaryEntity> {
    const providerEntity = await this.providerService.findOneEntity(providerId);
    createEntityDto.provider = providerEntity;
    return await this.summaryRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<SummaryEntity[]> {
    return await this.summaryRepository.findAllEntities();
  }

  async findByEntity(searchTerm: string): Promise<SummaryEntity> {
    return await this.summaryRepository.findByEntity(searchTerm);
  }

  async findOneEntity(providerId: string): Promise<SummaryEntity> {
    return await this.summaryRepository.findOneEntity(providerId);
  }

  async updateEntity(
    id: string,
    updateSummaryDto: UpdateSummaryDto,
  ): Promise<UpdateResult> {
    return await this.summaryRepository.updateEntity(id, updateSummaryDto);
  }

  async summaryPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<SummaryEntity>> {
    return this.summaryRepository.summaryPagination(query);
  }
}
