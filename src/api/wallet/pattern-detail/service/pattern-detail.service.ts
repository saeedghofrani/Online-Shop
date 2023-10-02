import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { PatternDetailEntity } from 'src/entities/wallet/pattern-detail.entity';
import { UpdateResult } from 'typeorm';
import { PatternMasterService } from '../../pattern-master/service/pattern-master.service';
import { CreatePatternDetailDto } from '../dto/create-pattern-detail.dto';
import { UpdatePatternDetailDto } from '../dto/update-pattern-detail.dto';
import { PatternDetailRepository } from '../repository/pattern-detail.repository';

@Injectable()
export class PatternDetailService {
  constructor(
    private patternDetailRepository: PatternDetailRepository,
    private patternMasterService: PatternMasterService,
  ) {}
  async createEntity(
    createEntityDto: CreatePatternDetailDto,
    pattern_master_id: string,
  ): Promise<PatternDetailEntity> {
    try {
      const patternMasterEntity = await this.patternMasterService.findOneEntity(
        pattern_master_id,
      );
      createEntityDto.pattern_master = patternMasterEntity;
      return await this.patternDetailRepository.createEntity(createEntityDto);
    } catch (e) {}
  }

  async findAllEntities(): Promise<PatternDetailEntity[]> {
    try {
      return await this.patternDetailRepository.findAllEntities();
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<PatternDetailEntity> {
    try {
      return await this.patternDetailRepository.findOneEntity(id);
    } catch (e) {}
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePatternDetailDto,
  ): Promise<UpdateResult> {
    try {
      return await this.patternDetailRepository.updateEntity(
        id,
        updateEntityDto,
      );
    } catch (e) {}
  }

  async patternDetailPagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<PatternDetailEntity>> {
    return this.patternDetailRepository.patternDetailPagination(query);
  }
}
