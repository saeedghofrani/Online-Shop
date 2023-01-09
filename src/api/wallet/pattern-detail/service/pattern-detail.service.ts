import { Injectable } from '@nestjs/common';
import { PatternDetailEntity } from 'src/entities/WALLET/pattern-detail.entity';
import { UpdateResult } from 'typeorm';
import { CreatePatternDetailDto } from '../dto/create-pattern-detail.dto';
import { UpdatePatternDetailDto } from '../dto/update-pattern-detail.dto';
import { PatternDetailRepository } from '../repository/pattern-detail.repository';

@Injectable()
export class PatternDetailService {
  constructor(
    private patternDetailRepository: PatternDetailRepository,
  ) {}
  async createEntity(
    createEntityDto: CreatePatternDetailDto,
  ): Promise<PatternDetailEntity> {
    try {
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
      return await this.patternDetailRepository.updateEntity(id, updateEntityDto);
    } catch (e) {}
  }
}
