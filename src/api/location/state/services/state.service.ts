import { Injectable } from '@nestjs/common';
import { Paginated } from 'nestjs-paginate';
import { PaginationQueryDto } from 'common/pagination/pagination-query.dto';
import { StateEntity } from 'entities/location/state.entity';
import { UpdateResult } from 'typeorm';
import { CreateStateDto } from '../dto/create-state.dto';
import { UpdateStateDto } from '../dto/update-state.dto';
import { StateRepository } from '../repositories/state.repository';

@Injectable()
export class StateService {
  constructor(private stateRepository: StateRepository) {}

  async createEntity(createEntityDto: CreateStateDto): Promise<StateEntity> {
    return await this.stateRepository.createEntity(createEntityDto);
  }
  async updateEntity(
    id: string,
    updateEntityDto: UpdateStateDto,
  ): Promise<UpdateResult> {
    return await this.stateRepository.updateEntity(id, updateEntityDto);
  }
  async findOneEntity(id: string): Promise<StateEntity> {
    return await this.stateRepository.findOneEntity(id);
  }
  async findAllEntities(): Promise<StateEntity[]> {
    return await this.stateRepository.findAllEntities();
  }

  async statePagination(
    query: PaginationQueryDto,
  ): Promise<Paginated<StateEntity>> {
    return this.stateRepository.statePagination(query);
  }
}
