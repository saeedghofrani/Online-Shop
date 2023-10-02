import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { WebEntity } from 'src/entities/inventory/web.entity';
import { UpdateResult } from 'typeorm';
import { ProviderService } from '../../provider/service/provider.service';
import { CreateWebDto } from '../dto/create-web.dto';
import { UpdateWebDto } from '../dto/update-web.dto';
import { WebRepository } from '../repository/web.repository';

@Injectable()
export class WebService {
  constructor(
    private webRepository: WebRepository,
    private providerService: ProviderService,
  ) {}

  async createEntity(createEntityDto: CreateWebDto): Promise<WebEntity> {
    const providerEntity = await this.providerService.findDefault();
    createEntityDto.provider = providerEntity;
    return await this.webRepository.createEntity(createEntityDto);
  }

  async findAllEntities(): Promise<WebEntity[]> {
    return await this.webRepository.findAllEntities();
  }

  async findByEntity(searchTerm: string): Promise<WebEntity> {
    return await this.webRepository.findByEntity(searchTerm);
  }

  async findOneEntity(providerId: string): Promise<WebEntity> {
    return await this.webRepository.findOneEntity(providerId);
  }

  async findLast(): Promise<WebEntity[]> {
    return await this.webRepository.findLast();
  }

  async updateEntity(
    id: string,
    updateWebDto: UpdateWebDto,
  ): Promise<UpdateResult> {
    return await this.webRepository.updateEntity(id, updateWebDto);
  }

  async webPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<WebEntity>> {
    return this.webRepository.webPagination(query);
  }
}
