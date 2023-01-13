import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { PatternMasterEntity } from 'src/entities/WALLET/pattern-master.entity';
import { UpdateResult } from 'typeorm';
import { CreatePatternMasterDto } from '../dto/create-pattern-master.dto';
import { UpdatePatternMasterDto } from '../dto/update-pattern-master.dto';
import { PatternMasterRepository } from '../repository/pattern-master.repository';

@Injectable()
export class PatternMasterService {
  constructor(private patternMasterRepository: PatternMasterRepository) {}
  async createEntity(
    createEntityDto: CreatePatternMasterDto,
  ): Promise<PatternMasterEntity> {
    try {
      return await this.patternMasterRepository.createEntity(createEntityDto);
    } catch (e) {}
  }

  async findAllEntities(): Promise<PatternMasterEntity[]> {
    try {
      return await this.patternMasterRepository.findAllEntities();
    } catch (e) {}
  }

  async findOneEntity(id: string): Promise<PatternMasterEntity> {
    try {
      return await this.patternMasterRepository.findOneEntity(id);
    } catch (e) {}
  }

  async updateEntity(
    id: string,
    updateEntityDto: UpdatePatternMasterDto,
  ): Promise<UpdateResult> {
    try {
      return await this.patternMasterRepository.updateEntity(
        id,
        updateEntityDto,
      );
    } catch (e) {}
  }

  async patternMasterPagination(query:PaginationQueryDto):Promise<Paginated<PatternMasterEntity>>
  {
    return this.patternMasterRepository.patternMasterPagination(query)
  }
}
